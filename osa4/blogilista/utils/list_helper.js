//const blog = require("../models/blog");

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let summa = 0
  //console.log(blog);
  blogs.map((blg) => (summa += blg.likes))
  //   console.log(blogs);
  //   console.log("LIKES", blogs.likes);
  return summa
}

const favoriteBlog = (blogs) => {
  let suosituin = blogs.reduce((max, blg) => {
    return blg.likes >= max.likes ? blg : max
  })

  // console.log("SUOSITUIN", suosituin);

  return suosituin
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
