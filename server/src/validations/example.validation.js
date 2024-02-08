import vine from "@vinejs/vine";

const schema = vine.object({
  username: vine.string(),
  email: vine.string().email(),
  password: vine
    .string()
    .minLength(8)
    .maxLength(32)
    .confirmed()
})

const data = {
  username: 'virk',
  email: 'virk@example.com',
  password: 'secretpass',
  password_confirmation: 'secretpass',
}

const validator = vine.compile(schema)
const output = validator.validate(data)

console.log(output)