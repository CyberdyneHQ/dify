from typing import Any, Dict, List
from core.rag.entities.context_entities import DocumentContext

class RagPipelineValidator:
    @staticmethod
    def validate_pipeline_config(config: Dict[str, Any]) -> None:
        if not config:
            raise ValueError("Pipeline config cannot be empty")
        
        if 'top_k' in config and config['top_k'] <= 0:
            raise ValueError("Top K must be positive")
        
        if 'score_threshold' in config and (config['score_threshold'] < 0 or config['score_threshold'] > 1):
            raise ValueError("Score threshold must be between 0 and 1")

    @staticmethod
    def compute_document_similarity(doc1: DocumentContext, doc2: DocumentContext) -> float:
        if not doc1 or not doc2:
            return 0.0
        
        # Simple similarity based on content length difference
        len1 = len(doc1.content) if doc1.content else 0
        len2 = len(doc2.content) if doc2.content else 0
        return 1.0 / (1.0 + abs(len1 - len2))

    @staticmethod
    def filter_high_quality_documents(documents: List[DocumentContext], min_quality: float) -> List[DocumentContext]:
        return [doc for doc in documents if doc.score >= min_quality]