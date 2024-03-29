"use strict";
var { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } = ReStock;

var { CandlestickSeries, BarSeries, LineSeries, AreaSeries } = series;
var { discontinuousTimeScaleProvider } = scale;

var { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate } = coordinates;

var { OHLCTooltip, MovingAverageTooltip } = tooltip;
var { XAxis, YAxis } = axes;
var { ema, sma } = indicator;

var { fitWidth, TypeChooser } = helper;

class CandleStickChartWithMA extends React.Component {
	render() {
		var { data, type, width, ratio } = this.props;

		var ema20 = ema()
			.windowSize(20) // optional will default to 10
			.sourcePath("close") // optional will default to close as the source
			.skipUndefined(true) // defaults to true
			.merge((d, c) => {d.ema20 = c}) // Required, if not provided, log a error
			.accessor(d => d.ema20) // Required, if not provided, log an error during calculation
			.stroke("blue") // Optional

		var sma20 = sma()
			.windowSize(20)
			.sourcePath("close")
			.merge((d, c) => {d.sma20 = c})
			.accessor(d => d.sma20)

		var ema50 = ema()
			.windowSize(50)
			.sourcePath("close")
			.merge((d, c) => {d.ema50 = c})
			.accessor(d => d.ema50)

		var smaVolume50 = sma()
			.windowSize(50)
			.sourcePath("volume")
			.merge((d, c) => {d.smaVolume50 = c})
			.accessor(d => d.smaVolume50)
			.stroke("#4682B4")
			.fill("#4682B4");

		return (
			<ChartCanvas ratio={ratio} width={width} height={400}
					margin={{ left: 70, right: 70, top: 10, bottom: 30 }} type={type}
					seriesName="MSFT"
					data={data} calculator={[sma20, ema20, ema50, smaVolume50]}
					xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
					xExtents={[new Date(2012, 0, 1), new Date(2012, 6, 2)]}>
				<Chart id={1}
						yExtents={[d => [d.high, d.low], sma20.accessor(), ema20.accessor(), ema50.accessor()]}
						padding={{ top: 10, bottom: 20 }}>
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="right" orient="right" ticks={5} />

					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={d3.format(".2f")} />

					<CandlestickSeries />
					<LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()}/>
					<LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
					<LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>
					<CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()} />
					<CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
					<CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />

					<OHLCTooltip origin={[-40, 0]}/>
					<MovingAverageTooltip onClick={(e) => console.log(e)} origin={[-38, 15]}
						calculators={[sma20, ema20, ema50]}/>
				</Chart>
				<Chart id={2}
						yExtents={[d => d.volume, smaVolume50.accessor()]}
						height={150} origin={(w, h) => [0, h - 150]}>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={d3.format(".0s")}/>

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={d3.timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={d3.format(".4s")} />

					<BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "red"} />
					<AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>
					<CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()} />
					<CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

CandleStickChartWithMA.propTypes = {
	data: React.PropTypes.array.isRequired,
	width: React.PropTypes.number.isRequired,
	ratio: React.PropTypes.number.isRequired,
	type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithMA.defaultProps = {
	type: "svg",
};
CandleStickChartWithMA = fitWidth(CandleStickChartWithMA);


var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
d3["tsv"]("//rrag.github.io/react-stockcharts/data/MSFT.tsv", (err, data) => {
	/* change MSFT.tsv to MSFT_full.tsv above to see how this works with lots of data points */
	data.forEach((d, i) => {
		d.date = new Date(d3.timeParse("%Y-%m-%d")(d.date).getTime());
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;
		// console.log(d);
	});
	/* change the type from hybrid to svg to compare the performance between svg and canvas */
	ReactDOM.render(<TypeChooser type="hybrid">{type => <CandleStickChartWithMA data={data} type={type} />}</TypeChooser>, document.getElementById("chart"));
});