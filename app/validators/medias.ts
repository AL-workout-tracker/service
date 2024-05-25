import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createMediaValidator = vine.compile(
  vine.object({
    mediaType: vine.string().trim().escape(),
    url: vine.string().trim().escape(),
    exerciseId: vine.number().positive(),
  })
)

/**
 * Validates the post's update action
 */
export const updateMediaValidator = vine.compile(
  vine.object({
    mediaType: vine.string().trim().escape().optional(),
    url: vine.string().trim().escape().optional(),
    exerciseId: vine.number().positive().optional(),
  })
)
