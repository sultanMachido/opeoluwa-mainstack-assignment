import { ChartContainer } from "@mui/x-charts";
import { LinePlot } from "@mui/x-charts/LineChart";

const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

type LineChartProps = {
  data: number[];
};

const LineChart = ({ data }: LineChartProps) => {
  return (
    <ChartContainer
      width={600}
      height={300}
      series={[{ type: "line", data: data }]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      sx={{
        ".MuiLineElement-root": {
          stroke: "#FF5403",
          strokeWidth: 1,
        },
        ".MuiMarkElement-root": {
          stroke: "#FF5403",
          scale: "0.6",
          fill: "#fff",
          strokeWidth: 1,
        },
      }}
      disableAxisListener
    >
      <LinePlot />
    </ChartContainer>
  );
};

export default LineChart;
