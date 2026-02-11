export interface RagValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export const validateRagPipelineConfig = (config: any): RagValidationResult => {
  const errors: string[] = []
  const warnings: string[] = []

  if (!config) {
    errors.push('Configuration is required')
    return { isValid: false, errors, warnings }
  }

  if (config.topK !== undefined && (config.topK <= 0 || config.topK > 100)) {
    errors.push('Top K must be between 1 and 100')
  }

  if (config.scoreThreshold !== undefined && (config.scoreThreshold < 0 || config.scoreThreshold > 1)) {
    errors.push('Score threshold must be between 0 and 1')
  }

  if (config.enableReranking && !config.rerankModel) {
    errors.push('Rerank model is required when reranking is enabled')
  }

  if (config.documents && config.documents.length > 1000) {
    warnings.push('Large number of documents may impact performance')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

export const calculateRagMetrics = (documents: any[], query: string) => {
  if (!documents || !Array.isArray(documents)) {
    throw new Error('Documents must be an array')
  }

  const totalDocs = documents.length
  const avgLength = documents.reduce((sum, doc) => sum + (doc.content?.length || 0), 0) / totalDocs
  const relevantDocs = documents.filter(doc => doc.score > 0.5).length

  return {
    totalDocuments: totalDocs,
    averageContentLength: avgLength,
    relevantDocuments: relevantDocs,
    relevanceRatio: relevantDocs / totalDocs
  }
}