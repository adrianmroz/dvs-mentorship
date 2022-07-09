<script>
  import { scaleLinear } from "d3";
  import { createEventDispatcher } from "svelte";
  import Scatterplot from "./Scatterplot.svelte";

  export let data = [];
  export let x;
  export let y;
  export let xs;
  export let ys;
  export let color;

  $: xScale = scaleLinear().domain(xs).range([0, 200]);
  $: yScale = scaleLinear().domain(ys).range([200, 0]);


  // Brush stuff
  let state = null;

  const selectionDispatch = createEventDispatcher();

  function dragStart(e) {
    state = {
      action: "moving",
      x0: e.offsetX,
      x1: e.offsetX,
      y0: e.offsetY,
      y1: e.offsetY
    };
  }

  function dragMove(e) {
    if (state && state.action === "moving") {
      state = {
        ...state,
        x1: e.offsetX,
        y1: e.offsetY
      };
    }

  }

  function dragStop() {
    if (state && state.action === "moving") {
      state = { ...state, action: "finished" };
      return;
    }
    if (state && state === "finished") {
      state = null;
      return;
    }
  }

  function resetDrag() {
    if (state && Math.abs(state.x0 - state.x1) < 5) {
      state = null;
    }
  }

  function convertToSelection({ x0, x1, y0, y1 }) {
    const minX = xScale.invert(Math.min(x0, x1));
    const maxX = xScale.invert(Math.max(x0, x1));

    // NOTE: Y-scale are always inverted-inverted
    const minY = yScale.invert(Math.max(y0, y1));
    const maxY = yScale.invert(Math.min(y0, y1));

    return data.filter(datum => {
      const datumX = x(datum);
      const datumY = y(datum);
      return datumX > minX && datumX < maxX && datumY > minY && datumY < maxY;
    });
  }

  $: {
    const selection = state ? convertToSelection(state) : null;
    selectionDispatch("selection", { selection });
  }
</script>

<Scatterplot
  data={data}
  color={color}
  xs={xs}
  ys={ys}
  x={x}
  y={y}
>
  <g slot="svg">
    {#if state}
      <rect
        x={Math.min(state.x0, state.x1)}
        y={Math.min(state.y0, state.y1)}
        width={Math.abs(state.x1 - state.x0)}
        height={Math.abs(state.y1 - state.y0)}
        fill-opacity="0.3"
        fill="hotpink"></rect>
    {/if}
  </g>

  <div
    slot="html"
    class="target"
    on:mousedown={dragStart}
    on:mouseup={dragStop}
    on:mousemove={dragMove}
    on:click={resetDrag}></div>

</Scatterplot>

<style>
    .target {
        position: absolute;
        width: 200px;
        height: 200px;
    }
</style>

