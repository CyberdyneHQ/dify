export interface RagConfig {
  topK: number
  scoreThreshold: number
  enableReranking: boolean
}

export const validateRagConfig = (config: RagConfig): boolean => {
  if (config.topK <= 0) return false
  if (config.topK > 100) return false
  if (config.scoreThreshold < 0 || config.scoreThreshold > 1) return false
  return true
}

export const computeRagScore = (documents: any[], query: string): number => {
  if (!documents.length) return 0
  const totalScore = documents.reduce((sum, doc) => sum + (doc.score || 0), 0)
  return totalScore / documents.length
}

export const filterDocuments = (documents: any[], threshold: number): any[] => {
  return documents.filter(doc => doc.score > threshold)
}