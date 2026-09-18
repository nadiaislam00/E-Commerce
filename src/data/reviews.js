const reviews = [];
const titles5 = ['Amazing quality', 'Love it!', 'Perfect fit', 'Highly recommend', 'Exceeded expectations'];
const titles3 = ['Just okay', 'Good but could be better', 'Not bad', 'Average', 'Decent quality'];
const names = ['Alice S.', 'Bob J.', 'Charlie W.', 'Diana B.', 'Ethan J.', 'Fiona G.', 'George M.', 'Hannah D.'];

for (let i = 1; i <= 60; i++) {
  const pid = `prod_${((i % 54) + 1).toString().padStart(3, '0')}`;
  const rating = (i % 4 === 0) ? 3 : (i % 7 === 0 ? 4 : 5);
  const title = rating >= 4 ? titles5[i % titles5.length] : titles3[i % titles3.length];
  
  reviews.push({
    id: `rev_${i.toString().padStart(3, '0')}`,
    productId: pid,
    userName: names[i % names.length],
    rating: rating,
    date: new Date(Date.now() - (i * 43200000)).toISOString().split('T')[0],
    title: title,
    text: `I bought this recently and it has been ${title.toLowerCase()}. The quality is exactly what you would expect from LOOM.`,
    helpful: i % 15,
    verified: (i % 3 !== 0)
  });
}

export { reviews };
