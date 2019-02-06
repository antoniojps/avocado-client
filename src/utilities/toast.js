import { toast as toastify } from 'react-toastify'

const position = toastify.POSITION.BOTTOM_RIGHT

export const toast = {
  info: (message) => toastify.info(message, { position }),
  success: (message) => toastify.success(message, { position }),
  warning: (message) => toastify.warning(message, { position }),
  error: (message) => toastify.error(message, { position }),
}
