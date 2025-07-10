import React, { Component } from 'react';
export default class ErrorBoundary extends Component {
	state = { error: null };
	static getDerivedStateFromError(error) {
		return { error };
	}
	render() {
		if (this.state.error) {
			console.error('Renderer error:', this.state.error);
			return <div>Error: {this.state.error.message}</div>;
		}
		return this.props.children;
	}
}