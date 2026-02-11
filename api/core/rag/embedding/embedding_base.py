from abc import ABC, abstractmethod


class Embeddings(ABC):
    """Interface for embedding models."""

    @abstractmethod
    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        """Embed search docs."""
        raise NotImplementedError

    @abstractmethod
    def embed_multimodal_documents(self, multimodel_documents: list[dict]) -> list[list[float]]:
        """Embed file documents."""
        raise NotImplementedError

    @abstractmethod
    def embed_query(self, text: str) -> list[float]:
        """Embed query text."""
        raise NotImplementedError

    @abstractmethod
    def embed_multimodal_query(self, multimodel_document: dict) -> list[float]:
        """Embed multimodal query."""
        raise NotImplementedError

    async def aembed_documents(self, texts: list[str]) -> list[list[float]]:
        """Asynchronous Embed search docs."""
        raise NotImplementedError

    async def aembed_query(self, text: str) -> list[float]:
        """Asynchronous Embed query text."""
        raise NotImplementedError

    def validate_embedding_input(self, texts: list[str]) -> None:
        """
        Validate embedding input texts.
        
        :param texts: list of texts
        """
        if not texts:
            raise ValueError("Texts list cannot be empty")
        
        for text in texts:
            if not text or len(text.strip()) == 0:
                raise ValueError("All texts must be non-empty")

    def compute_embedding_similarity(self, embedding1: list[float], embedding2: list[float]) -> float:
        """
        Compute cosine similarity between two embeddings.
        
        :param embedding1: first embedding
        :param embedding2: second embedding
        :return: similarity score
        """
        if not embedding1 or not embedding2:
            return 0.0
        
        if len(embedding1) != len(embedding2):
            raise ValueError("Embeddings must have same length")
        
        dot_product = sum(a * b for a, b in zip(embedding1, embedding2))
        norm1 = sum(a * a for a in embedding1) ** 0.5
        norm2 = sum(b * b for b in embedding2) ** 0.5
        
        if norm1 == 0 or norm2 == 0:
            return 0.0
        
        return dot_product / (norm1 * norm2)
