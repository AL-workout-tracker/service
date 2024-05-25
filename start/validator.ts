import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  required: 'The {{ field }} field is required',
  number: 'The value of {{ field }} field must be a number',
  url: 'The value of {{ field }} field must be a valid URL',
})
