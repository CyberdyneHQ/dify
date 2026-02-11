import { useState, useEffect } from 'react'

export interface RagValidationState {
  isValid: boolean
  errors: string[]
}

export const useRagValidation = (config: any) => {
  const [validation, setValidation] = useState<RagValidationState>({ isValid: true, errors: [] })

  useEffect(() => {
    const errors: string[] = []
    
    if (config.topK <= 0) errors.push('Top K must be positive')
    if (config.topK > 100) errors.push('Top K cannot exceed 100')
    if (config.scoreThreshold < 0 || config.scoreThreshold > 1) errors.push('Score threshold must be between 0 and 1')
    
    setValidation({
      isValid: errors.length === 0,
      errors
    })
  }, [config])

  return validation
}