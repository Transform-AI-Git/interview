import type React from "react";
import { useEffect, useState } from "react";
import { useDebounce } from "../lib/utils.ts";

interface SearchBarProps {
	onSearch: (city: string) => void;
	placeholder?: string;
}

export function SearchBar({
	onSearch,
	placeholder = "Enter city name...",
}: SearchBarProps) {
	const [input, setInput] = useState("");
	const debouncedSearchTerm = useDebounce(input);

	useEffect(() => {
		console.log("Debounced search term:", debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (input.trim()) {
			onSearch(input.trim());
			setInput("");
		}
	};

	// TODO: Implement debounced search to call cities API and render a list of suggestions

	return (
		<form onSubmit={handleSubmit} className="search-bar">
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder={placeholder}
				className="search-input"
			/>
			<button type="submit" className="search-button">
				Search
			</button>
		</form>
	);
}
