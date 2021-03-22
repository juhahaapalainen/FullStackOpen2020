import { useState } from 'react'

const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
        console.log('usefield hook:', event.target.value)
      setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }
  
    return {
      type,
      value,
      onChange,
      reset
    }
}

  export default useField