interface ErrorMessageProps {
	message: string;
	onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
	return (
		<div className="error-message">
			<p className="error-text">⚠️ {message}</p>
			{onRetry && (
				<button onClick={onRetry} className="retry-button">
					Try Again
				</button>
			)}
		</div>
	);
}