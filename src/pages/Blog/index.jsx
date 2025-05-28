import React, {useState} from "react";
import blogImg1 from "../../assets/images/1.png";
import blogImg2 from "../../assets/images/2.png";
import blogImg3 from "../../assets/images/3.png";
import blogImg4 from "../../assets/images/4.png";
import blogImg5 from "../../assets/images/5.png";
import blogImg6 from "../../assets/images/6.png";
import blogImg7 from "../../assets/images/7.png";
import blogImg8 from "../../assets/images/8.png";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import "./index.scss"; // Assuming you have a Blog.scss file for styles

const blogPosts = [
  {
    title: "The Importance of School Healthcare",
    excerpt:
      "School healthcare plays a key role in protecting and improving student health. From early detection of illness, regular health monitoring, to health education and disease prevention campaigns, all are implemented comprehensively. An effective school health system not only reduces absenteeism due to illness but also raises students’ awareness about personal healthcare.",
    image: blogImg1,
    date: "27/05/2025",
  },
  {
    title: "Healthy School Nutrition",
    excerpt:
      "School meals must ensure adequate nutrition, food safety, and suit the physical needs of different age groups. Studies have shown that children with a proper diet tend to learn better, develop physically in balance, and maintain a positive mental state. Designing reasonable menus, supervising food sources, and promoting nutrition education should be coordinated closely by schools and parents.",
    image: blogImg2,
    date: "20/05/2025",
  },
  {
    title: "Preventing Disease Outbreaks in Schools",
    excerpt:
      "Crowded school environments can easily become hotspots for outbreaks if preventive measures are not in place. Basic practices such as proper handwashing, wearing masks when needed, maintaining classroom hygiene, and organizing regular health check-ups can help limit the spread. Raising awareness about disease prevention among students and teachers is crucial for creating a safe school environment.",
    image: blogImg3,
    date: "15/05/2025",
  },
  {
    title: "Supporting Students’ Mental Health",
    excerpt:
      "Stress, academic pressure, and social relationships can affect students’ mental well-being. Schools should offer psychological counseling services, encourage students to share their concerns, and provide timely support to ensure positive mental health.",
    image: blogImg4,
    date: "10/05/2025",
  },
  {
    title: "Exercise and Physical Activity",
    excerpt:
      "Physical activity is essential for maintaining health, reducing stress, and improving academic performance. School physical education and sports programs should be held regularly and offer a variety of options.",
    image: blogImg5,
    date: "03/05/2025",
  },
  {
    title: "School Immunization Programs",
    excerpt:
      "Organizing vaccinations at school for diseases such as flu, hepatitis B, measles – mumps – rubella, etc., is an effective way to prevent illness and control outbreaks within the student community.",
    image: blogImg6,
    date: "25/04/2025",
  },
  {
    title: "Role of School Health Staff",
    excerpt:
      "School health staff are directly responsible for first aid, health counseling, and coordinating with parents when students have health issues. Investing in this team is vital for a functioning school healthcare system.",
    image: blogImg7,
    date: "18/04/2025",
  },
  {
    title: "Collaboration Between Family, School, and Local Health Authorities",
    excerpt:
      "Collaboration between these three parties is essential for managing student health. This includes updating health records, sharing medical information, and educating students about healthcare practices.",
    image: blogImg8,
    date: "10/04/2025",
  },
];

const Blog = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleExpand = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  return (
    <main className="blog-page">
      <Container axWidth={false} disableGutters className="blog-container">
        <header className="blog-header">
          <Typography
            variant="h2"
            className="blog-title"
            component="h1"
            gutterBottom
          >
            Article on School Healthcare
          </Typography>
          <Typography
            variant="subtitle1"
            className="blog-subtitle"
            gutterBottom
          >
            Update knowledge and information on modern student healthcare.
          </Typography>
        </header>

        <section className="blog-posts">
          <Grid container className="MuiGrid-container" spacing={6}>
            {/* Hàng 1: 2 post, 1 to 1 nhỏ, cùng 1 hàng */}
            {blogPosts[0] && (
              <Grid item xs={12} md={8} className="MuiGrid-item" key={0}>
                <Card
                  className="blog-card"
                  elevation={10}
                  tabIndex={0}
                  aria-label={blogPosts[0].title}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="blog-card-media"
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      className="blog-post-date"
                      display="block"
                      gutterBottom
                    >
                      {blogPosts[0].date}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="blog-post-title"
                      gutterBottom
                    >
                      {blogPosts[0].title}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={`blog-post-excerpt${
                        expandedIndexes.includes(0) ? " expanded" : ""
                      }`}
                      paragraph
                    >
                      {expandedIndexes.includes(0)
                        ? blogPosts[0].excerpt
                        : blogPosts[0].excerpt.length > 150
                        ? blogPosts[0].excerpt.slice(0, 150) + "..."
                        : blogPosts[0].excerpt}
                    </Typography>
                    {blogPosts[0].excerpt.length > 150 && (
                      <Button
                        size="small"
                        className="read-more-btn"
                        onClick={() => toggleExpand(0)}
                      >
                        {expandedIndexes.includes(0) ? "Collapse" : "Read more"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )}
            {blogPosts[1] && (
              <Grid item xs={12} md={4} className="MuiGrid-item" key={1}>
                <Card
                  className="blog-card"
                  elevation={10}
                  tabIndex={0}
                  aria-label={blogPosts[1].title}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={blogPosts[1].image}
                    alt={blogPosts[1].title}
                    className="blog-card-media"
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      className="blog-post-date"
                      display="block"
                      gutterBottom
                    >
                      {blogPosts[1].date}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="blog-post-title"
                      gutterBottom
                    >
                      {blogPosts[1].title}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={`blog-post-excerpt${
                        expandedIndexes.includes(1) ? " expanded" : ""
                      }`}
                      paragraph
                    >
                      {expandedIndexes.includes(1)
                        ? blogPosts[1].excerpt
                        : blogPosts[1].excerpt.length > 150
                        ? blogPosts[1].excerpt.slice(0, 150) + "..."
                        : blogPosts[1].excerpt}
                    </Typography>
                    {blogPosts[1].excerpt.length > 150 && (
                      <Button
                        size="small"
                        className="read-more-btn"
                        onClick={() => toggleExpand(1)}
                      >
                        {expandedIndexes.includes(1) ? "Collapse" : "Read more"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Hàng 2-6: mỗi hàng 1 post, full width */}
            {blogPosts.slice(2, 7).map((post, idx) => (
              <Grid item xs={12} className="MuiGrid-item" key={idx + 2}>
                <Card
                  className="blog-card"
                  elevation={10}
                  tabIndex={0}
                  aria-label={post.title}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                    className="blog-card-media"
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      className="blog-post-date"
                      display="block"
                      gutterBottom
                    >
                      {post.date}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="blog-post-title"
                      gutterBottom
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={`blog-post-excerpt${
                        expandedIndexes.includes(idx + 2) ? " expanded" : ""
                      }`}
                      paragraph
                    >
                      {expandedIndexes.includes(idx + 2)
                        ? post.excerpt
                        : post.excerpt.length > 150
                        ? post.excerpt.slice(0, 150) + "..."
                        : post.excerpt}
                    </Typography>
                    {post.excerpt.length > 150 && (
                      <Button
                        size="small"
                        className="read-more-btn"
                        onClick={() => toggleExpand(idx + 2)}
                      >
                        {expandedIndexes.includes(idx + 2)
                          ? "Collapse"
                          : "Read more"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Các post sau (nếu có) */}
            {blogPosts.slice(7).map((post, idx) => (
              <Grid item xs={12} className="MuiGrid-item" key={idx + 7}>
                <Card
                  className="blog-card"
                  elevation={10}
                  tabIndex={0}
                  aria-label={post.title}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                    className="blog-card-media"
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      className="blog-post-date"
                      display="block"
                      gutterBottom
                    >
                      {post.date}
                    </Typography>
                    <Typography
                      variant="h5"
                      className="blog-post-title"
                      gutterBottom
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={`blog-post-excerpt${
                        expandedIndexes.includes(idx + 7) ? " expanded" : ""
                      }`}
                      paragraph
                    >
                      {expandedIndexes.includes(idx + 7)
                        ? post.excerpt
                        : post.excerpt.length > 150
                        ? post.excerpt.slice(0, 150) + "..."
                        : post.excerpt}
                    </Typography>
                    {post.excerpt.length > 150 && (
                      <Button
                        size="small"
                        className="read-more-btn"
                        onClick={() => toggleExpand(idx + 7)}
                      >
                        {expandedIndexes.includes(idx + 7)
                          ? "Collapse"
                          : "Read more"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </main>
  );
};

export default Blog;
