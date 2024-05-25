import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createExerciseValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape(),
    description: vine.string().trim().escape(),
  })
)

/**
 * Validates the post's update action
 */
export const updateExerciseValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape().optional(),
    description: vine.string().trim().escape().optional(),
  })
)
