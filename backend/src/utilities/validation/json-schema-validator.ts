import Ajv, { AnySchema, ErrorObject } from 'ajv'
import { BadRequestError } from '../../api/errors'

const formatErrors = (errors?: ErrorObject[] | null) => {
  if (!errors) return ''

  return errors.map(err => {
    if (err.keyword === 'type') {
      return `${err.instancePath?.slice(1)} ${err.message}`
    }

    return err.message
  }).join(', ')
}

export const validate = (schema: AnySchema, data: Record<string, any>): { message: string; errors?: string | null } => {
  const ajv = new Ajv({ allErrors: true })

  const validate = ajv.compile(schema)

  const valid = validate(data)

  if (!valid) {
    return {
      message: 'error',
      errors: formatErrors(validate.errors),
    }
  }

  return {
    message: 'ok',
  }
}

export const httpValidate = (schema: AnySchema, data: Record<string, any>) => {
  const { errors } = validate(schema, data)

  if (errors) {
    throw new BadRequestError(errors)
  }
}
