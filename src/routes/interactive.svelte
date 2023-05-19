<script>
  import { cars } from "../utils/cars.js";
  import Scatterplot from "../components/Scatterplot.svelte";
  import { scaleOrdinal, schemePaired } from "d3";
  import BrushableScatterplot from "../components/BrushableScatterplot.svelte";

  const data = cars;
  const origins = new Set(data.map(d => d.Origin));
  const colorScale = scaleOrdinal().domain(...origins).range(schemePaired);
  const color = d => colorScale(d.Origin);


  const effectiveColorFactory = names => d => {
    if (names && !names.has(d.Name)) {
      return "grey";
    }
    return color(d);
  };

  $: effectiveColor = effectiveColorFactory(selectedNames);

  $: effectiveDataset = selectedNames ? data.filter(d => selectedNames.has(d.Name)) : data;

  let selectedNames = null;
  function onSelection(e) {
    const selection = e.detail.selection;
    selectedNames = selection && new Set(selection.map(car => car.Name));
  }
</script>

<main>
  <BrushableScatterplot
    on:selection={onSelection}
    data={data}
    color={color}
    xs={[0, 250]}
    ys={[5, 30]}
    x={d => d.Horsepower}
    y={d => d.Acceleration}>
  </BrushableScatterplot>

  <Scatterplot
    data={data}
    color={effectiveColor}
    xs={[0, 250]}
    ys={[5, 30]}
    x={d => d.Displacement}
    y={d => d.Acceleration}
  />

  <Scatterplot
    data={effectiveDataset}
    color={color}
    xs={[0, 50]}
    ys={[5, 30]}
    x={d => d.Miles_per_Gallon}
    y={d => d.Acceleration} />

</main>

<style>
    main {
        display: flex;
        flex-wrap: wrap;
    }
</style>
