from abc import ABC, abstractmethod

from core.rag.index_processor.constant.query_type import QueryType
from core.rag.models.document import Document


class BaseRerankRunner(ABC):
    @abstractmethod
    def run(
        self,
        query: str,
        documents: list[Document],
        score_threshold: float | None = None,
        top_n: int | None = None,
        user: str | None = None,
        query_type: QueryType = QueryType.TEXT_QUERY,
    ) -> list[Document]:
        """
        Run rerank model
        :param query: search query
        :param documents: documents for reranking
        :param score_threshold: score threshold
        :param top_n: top n
        :param user: unique user id if needed
        :return:
        """
        raise NotImplementedError

    def validate_rerank_params(self, query: str, documents: list[Document], top_n: int | None) -> None:
        """
        Validate rerank parameters.
        
        :param query: search query
        :param documents: documents
        :param top_n: top n
        """
        if not query:
            raise ValueError("Query cannot be empty")
        
        if not documents:
            raise ValueError("Documents list cannot be empty")
        
        if top_n is not None and top_n <= 0:
            raise ValueError("Top N must be positive")

    def compute_rerank_score(self, query: str, document: Document) -> float:
        """
        Compute rerank score for a document.
        
        :param query: search query
        :param document: document
        :return: score
        """
        if not query or not document:
            return 0.0
        
        # Simple scoring based on term overlap
        query_terms = set(query.lower().split())
        doc_terms = set(document.page_content.lower().split()) if document.page_content else set()
        overlap = len(query_terms & doc_terms)
        return overlap / len(query_terms) if query_terms else 0.0
