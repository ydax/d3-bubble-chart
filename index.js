const data = [{
        name: 'news',
        parent: ''
    },
    {
        name: 'tech',
        parent: 'news'
    },
    {
        name: 'sport',
        parent: 'news'
    },
    {
        name: 'music',
        parent: 'news'
    },
    {
        name: 'ai',
        parent: 'tech',
        amount: 7
    },
    {
        name: 'coding',
        parent: 'tech',
        amount: 5
    },
    {
        name: 'tablets',
        parent: 'tech',
        amount: 4
    },
    {
        name: 'laptops',
        parent: 'tech',
        amount: 6
    },
    {
        name: 'd3',
        parent: 'tech',
        amount: 3
    },
    {
        name: 'gaming',
        parent: 'tech',
        amount: 3
    },
    {
        name: 'football',
        parent: 'sport',
        amount: 6
    },
    {
        name: 'hockey',
        parent: 'sport',
        amount: 3
    },
    {
        name: 'baseball',
        parent: 'sport',
        amount: 5
    },
    {
        name: 'tennis',
        parent: 'sport',
        amount: 6
    },
    {
        name: 'racing',
        parent: 'sport',
        amount: 1
    },
    {
        name: 'house',
        parent: 'music',
        amount: 3
    },
    {
        name: 'rock',
        parent: 'music',
        amount: 2
    },
    {
        name: 'punk',
        parent: 'music',
        amount: 5
    },
    {
        name: 'jazz',
        parent: 'music',
        amount: 2
    },
    {
        name: 'pop',
        parent: 'music',
        amount: 3
    },
    {
        name: 'classical',
        parent: 'music',
        amount: 5
    },
];

// create the svg canvas
const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 1060)
    .attr('height', 800);

// create the graph group
const graph = svg.append('g')
    .attr('transform', 'translate(50, 50)'); // give it a 50px margin

// utility function to work with our stratify dataset
const stratify = d3.stratify()
    .id(d => d.name)
    .parentId(d => d.parent);

const rootNode = stratify(data)
    .sum(d => d.amount);

// generate a radius, value, x, and y for each of my objects -- I'll join these to circles
const pack = d3.pack()
    .size([960, 700])
    .padding(5)

// turn my data back into an array of data that I can then join to my circles
const bubbleData = pack(rootNode).descendants();

// create ordinal scale
const color = d3.scaleOrdinal(['#000066', '#000099', '#0033cc']);

// join data and add group for each node
const nodes = graph.selectAll('g')
    .data(bubbleData) // join the data to groups > creates enter selection for each group element
    .enter() // gives me access to the enter selection
    .append('g') // appends a group to each group in the enter selection
    .attr('transform', d => `translate(${d.x}, ${d.y})`)
// ^-- above returns an array of groups

// creates the basic bubble chart
nodes.append('circle')
    .attr('r', d => d.r)
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
    .attr('fill', d => color(d.depth))
//                    ^--- returns a differnt color based on the depth of the bubble

// adds text inside each circle to label it
nodes.filter(item => !item.children)
    //                  ^--- returns falsy if no children
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.3em')
    //     ^--- offset in the y direction
    .attr('fill', '#33ffff')
    .style('font-size', d => d.value * 5)
    .text(d => d.data.name);

// adds a header
nodes.filter(item => !item.parent)
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '-9.5em')
    .attr('fill', '#33cccc')
    .style('font-size', 30)
    .text('All Blogs');