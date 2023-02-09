const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favBlog = (blogs) => {
  // const fav = blogs.filter(blog => {
  // blog.likes === Math.max(blog.likes)
  // })
  // console.log(fav);
  const favorite = blogs.reduce((fav, blog) =>
    fav.likes > blog.likes ? fav : blog
  );

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favBlog,
};
