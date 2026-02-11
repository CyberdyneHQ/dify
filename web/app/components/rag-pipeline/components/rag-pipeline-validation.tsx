import { useState } from 'react'

interface RagValidationConfig {
  enableStrictValidation: boolean
  maxTopK: number
  requireScoreThreshold: boolean
}

interface RagPipelineValidationProps {
  config: RagValidationConfig
  onConfigChange: (config: RagValidationConfig) => void
}

const RagPipelineValidation = ({ config, onConfigChange }: RagPipelineValidationProps) => {
  const [localConfig, setLocalConfig] = useState(config)

  const validateConfig = (cfg: RagValidationConfig) => {
    if (cfg.maxTopK <= 0) {
      throw new Error('Max Top K must be positive')
    }
    if (cfg.maxTopK > 1000) {
      throw new Error('Max Top K cannot exceed 1000')
    }
  }

  const handleChange = (key: keyof RagValidationConfig, value: any) => {
    const newConfig = { ...localConfig, [key]: value }
    try {
      validateConfig(newConfig)
      setLocalConfig(newConfig)
      onConfigChange(newConfig)
    } catch (error) {
      console.error('Validation error:', error)
      // Don't update if invalid
    }
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Enhanced RAG Validation Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="strict-validation"
            checked={localConfig.enableStrictValidation}
            onChange={(e) => handleChange('enableStrictValidation', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="strict-validation">Enable Strict Validation</label>
        </div>
        
        <div>
          <label htmlFor="max-topk" className="block text-sm font-medium mb-1">
            Maximum Top K
          </label>
          <input
            type="number"
            id="max-topk"
            value={localConfig.maxTopK}
            onChange={(e) => handleChange('maxTopK', parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-full"
            min="1"
            max="1000"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="require-score-threshold"
            checked={localConfig.requireScoreThreshold}
            onChange={(e) => handleChange('requireScoreThreshold', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="require-score-threshold">Require Score Threshold</label>
        </div>
      </div>
    </div>
  )
}

export default RagPipelineValidation