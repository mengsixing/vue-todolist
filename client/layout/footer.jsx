import '../assets/styles/footer.less';
export default {
	data () {

		return {
			author:'yhlben'
		};

	},
	render () {

		return (
			<div id="footer">
				<span>Written by {this.author}</span>
			</div>
		);

	}
};

