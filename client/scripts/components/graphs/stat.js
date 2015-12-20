'use strict';

import React from 'react';

export default React.createClass({
	render(){
		return (
			<div className="stat">
				<div className="inner">
					<span className={'icon icon-' + this.props.icon} />
					<div className="value">
						{this.props.value}
						<span className="unit">{this.props.unit || ''}</span>
					</div>
					<div className="subtitle">{this.props.subtitle}</div>
				</div>
			</div>
		);
	}
});
