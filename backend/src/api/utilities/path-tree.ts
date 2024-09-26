import { NotFoundError } from '../errors'
import { Endpoint } from '../types'

export interface ResolvedEndpoint {
  endpoint: Endpoint
  params: Record<string, any>
}

class TreeNode {
  children: TreeNode[] = []
  endpoint?: Endpoint
  currPath: string

  constructor(currPath: string) {
    this.currPath = currPath
  }

  resolve(path: string[], params: Record<string, any>): { endpoint: Endpoint | undefined; params: Record<string, any> } {
    let found: TreeNode | undefined
    let paramsClone = { ...params }

    found = this.children.find(el => el.currPath === path[0])

    if (!found) {
      found = this.children.find(el => el.currPath.includes(':'))

      if (found) {
        paramsClone[found.currPath.slice(1)] = path[0]
      }
    }

    if (!found) {
      throw new NotFoundError('No endpoint found with this path')
    }

    if (!path[1]) {
      return {
        endpoint: found.endpoint,
        params: paramsClone,
      }
    }

    return found.resolve(path.slice(1), paramsClone)
  }

  add(endpoint: Endpoint, path: string[]) {
    if (!path[0]) return

    const match = this.children.find(n => n.currPath === path[0])

    if (match) {
      match.add(endpoint, path.slice(1))
    } else {
      const newNode = new TreeNode(path[0])

      if (!path[1]) {
        newNode.addEndpoint(endpoint)
      }

      this.children.push(newNode)

      newNode.add(endpoint, path.slice(1))
    }
  }

  addEndpoint(endpoint: Endpoint) {
    this.endpoint = endpoint
  }
}

export class PathTree {
  root: TreeNode[] = []

  add(endpoint: Endpoint) {
    const pathArr = endpoint.path.split('/').filter(el => el)

    const match = this.root.find(n => n.currPath === pathArr[0])

    if (match) {
      match.add(endpoint, pathArr.slice(1))
      match.addEndpoint(endpoint)
    } else {
      const newNode = new TreeNode(pathArr[0])

      if (!pathArr[1]) {
        newNode.addEndpoint(endpoint)
      }

      this.root.push(newNode)

      newNode.add(endpoint, pathArr.slice(1))
    }
  }

  resolve(path: string): { endpoint: Endpoint; params: Record<string, any> } {
    const pathArr = path.split('/').filter(el => el)

    const node = this.root.find(n => n.currPath === pathArr[0])

    if (!node) {
      throw new NotFoundError('No endpoint found with this path')
    }

    if (!pathArr[1]) {
      if (node.endpoint) {
        return { endpoint: node.endpoint, params: {} }
      } else {
        throw new NotFoundError('No endpoint found with this path')
      }
    }

    const resolved = node.resolve(pathArr.slice(1), {})

    if (!resolved.endpoint) {
      throw new Error('Unable to resolve endpoint')
    }

    return resolved as ResolvedEndpoint
  }
}
