window.addEventListener('load', async () => {
  let blogDataRaw = await fetch('http://localhost:3000/processBlog');
  let blogData = await blogDataRaw.json();
  blogData = d3.sort(blogData, (d) => d.dateAdded);
  //clean data
  blogData.forEach((d) => {
    if (d.workoutType == 'yoga') {
      d.yoga = 1;
    } else {
      d.yoga = 0;
    }
  });

  let stepScale = d3
    .scaleLinear()
    .domain([
      d3.min(blogData, (d) => d.steps),
      d3.max(blogData, (d) => d.steps),
    ])
    .range([2, 70]);

  let newRow = d3
    .select('.table')
    .selectAll('.row.data')
    .data(blogData)
    .join('div')
    .attr('class', 'row data');

  newRow
    .append('div')
    .html((d) => {
      return d.dateAdded;
    })
    .attr('class', 'col');

  newRow
    .append('div')
    .html((d) => {
      return `<div class="rect-inner" style="width: ${stepScale(d.steps)}%">${
        d.steps
      }</div>`;
    })
    .attr('class', 'col');

  newRow
    .append('div')
    .html((d) => {
      let color;
      if (d.yoga == 1) {
        color = 'green';
      } else {
        color = 'red';
      }

      return `<div class="circle-inner" style="background: ${color}"></div>`;
    })
    .attr('class', 'col');
});
