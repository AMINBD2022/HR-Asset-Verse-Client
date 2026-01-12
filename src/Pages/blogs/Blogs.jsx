import { useState } from "react";
import { Link } from "react-router";
import { FiCalendar, FiUser, FiClock, FiArrowRight } from "react-icons/fi";
import useAOS from "../../hooks/useAOS";
import { pageAnimations } from "../../utils/aosAnimations";

const Blogs = () => {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize AOS for this page
  useAOS();

  // 20 dummy blog posts
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Asset Management in Remote Work",
      excerpt:
        "Discover how modern asset management systems are adapting to the remote work revolution and what it means for your organization.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Remote Work",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      tags: ["Remote Work", "Asset Management", "Technology"],
    },
    {
      id: 2,
      title: "10 Best Practices for IT Asset Tracking",
      excerpt:
        "Learn the essential strategies that successful companies use to track and manage their IT assets effectively.",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Best Practices",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
      tags: ["IT Assets", "Tracking", "Management"],
    },
    {
      id: 3,
      title: "Digital Transformation in HR Asset Management",
      excerpt:
        "How digital transformation is revolutionizing the way HR departments manage and distribute company assets.",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Digital Transformation",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop",
      tags: ["HR", "Digital Transformation", "Innovation"],
    },
    {
      id: 4,
      title: "Security Considerations for Asset Management Systems",
      excerpt:
        "Essential security measures every organization should implement when managing digital and physical assets.",
      author: "David Kim",
      date: "2024-01-08",
      readTime: "8 min read",
      category: "Security",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      tags: ["Security", "Risk Management", "Compliance"],
    },
    {
      id: 5,
      title: "Cost Optimization Through Smart Asset Management",
      excerpt:
        "Discover proven strategies to reduce costs and maximize ROI through intelligent asset management practices.",
      author: "Lisa Thompson",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Cost Management",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      tags: ["Cost Optimization", "ROI", "Efficiency"],
    },
    {
      id: 6,
      title: "Mobile Asset Management: Apps and Solutions",
      excerpt:
        "Explore the latest mobile solutions that are making asset management more accessible and efficient than ever.",
      author: "James Wilson",
      date: "2024-01-03",
      readTime: "5 min read",
      category: "Mobile Technology",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      tags: ["Mobile Apps", "Technology", "Accessibility"],
    },
    {
      id: 7,
      title: "Sustainability in Asset Management",
      excerpt:
        "How sustainable practices in asset management can benefit both your organization and the environment.",
      author: "Maria Garcia",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "Sustainability",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop",
      tags: ["Sustainability", "Environment", "Green Technology"],
    },
    {
      id: 8,
      title: "AI and Machine Learning in Asset Tracking",
      excerpt:
        "Discover how artificial intelligence is transforming asset tracking and predictive maintenance strategies.",
      author: "Robert Anderson",
      date: "2023-12-25",
      readTime: "9 min read",
      category: "Artificial Intelligence",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      tags: ["AI", "Machine Learning", "Predictive Analytics"],
    },
    {
      id: 9,
      title: "Building a Culture of Asset Responsibility",
      excerpt:
        "Learn how to foster a company culture where every employee takes ownership of organizational assets.",
      author: "Jennifer Lee",
      date: "2023-12-22",
      readTime: "6 min read",
      category: "Company Culture",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      tags: ["Company Culture", "Employee Engagement", "Responsibility"],
    },
    {
      id: 10,
      title: "Cloud-Based Asset Management Solutions",
      excerpt:
        "Why cloud-based solutions are becoming the preferred choice for modern asset management systems.",
      author: "Thomas Brown",
      date: "2023-12-20",
      readTime: "5 min read",
      category: "Cloud Technology",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      tags: ["Cloud Computing", "SaaS", "Scalability"],
    },
    {
      id: 11,
      title: "Asset Lifecycle Management: A Complete Guide",
      excerpt:
        "Understanding the complete lifecycle of assets from procurement to disposal and everything in between.",
      author: "Amanda Davis",
      date: "2023-12-18",
      readTime: "10 min read",
      category: "Lifecycle Management",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      tags: ["Lifecycle Management", "Procurement", "Disposal"],
    },
    {
      id: 12,
      title: "Integration Strategies for Asset Management Systems",
      excerpt:
        "Best practices for integrating asset management systems with existing enterprise software solutions.",
      author: "Kevin Martinez",
      date: "2023-12-15",
      readTime: "8 min read",
      category: "System Integration",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      tags: ["Integration", "Enterprise Software", "API"],
    },
    {
      id: 13,
      title: "Compliance and Regulatory Requirements",
      excerpt:
        "Navigate the complex landscape of compliance requirements in asset management across different industries.",
      author: "Rachel White",
      date: "2023-12-12",
      readTime: "7 min read",
      category: "Compliance",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
      tags: ["Compliance", "Regulations", "Legal Requirements"],
    },
    {
      id: 14,
      title: "Asset Management for Small and Medium Businesses",
      excerpt:
        "Tailored asset management strategies that work specifically for small and medium-sized enterprises.",
      author: "Daniel Taylor",
      date: "2023-12-10",
      readTime: "6 min read",
      category: "SMB Solutions",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop",
      tags: ["SMB", "Small Business", "Scalable Solutions"],
    },
    {
      id: 15,
      title: "The Role of IoT in Modern Asset Management",
      excerpt:
        "How Internet of Things devices are revolutionizing real-time asset tracking and monitoring.",
      author: "Sophie Clark",
      date: "2023-12-08",
      readTime: "8 min read",
      category: "IoT Technology",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
      tags: ["IoT", "Real-time Tracking", "Smart Devices"],
    },
    {
      id: 16,
      title: "Data Analytics in Asset Management",
      excerpt:
        "Leveraging data analytics to make informed decisions and optimize asset utilization across your organization.",
      author: "Christopher Moore",
      date: "2023-12-05",
      readTime: "9 min read",
      category: "Data Analytics",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      tags: ["Data Analytics", "Business Intelligence", "Optimization"],
    },
    {
      id: 17,
      title: "Asset Management Trends for 2024",
      excerpt:
        "Stay ahead of the curve with the latest trends and innovations shaping the asset management industry.",
      author: "Nicole Johnson",
      date: "2023-12-03",
      readTime: "7 min read",
      category: "Industry Trends",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      tags: ["Trends", "Innovation", "Future Technology"],
    },
    {
      id: 18,
      title: "Disaster Recovery for Asset Management Systems",
      excerpt:
        "Essential strategies to protect your asset data and ensure business continuity during unexpected events.",
      author: "Mark Thompson",
      date: "2023-12-01",
      readTime: "6 min read",
      category: "Disaster Recovery",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      tags: ["Disaster Recovery", "Business Continuity", "Data Protection"],
    },
    {
      id: 19,
      title: "User Training and Adoption Strategies",
      excerpt:
        "Proven methods to ensure successful user adoption of new asset management systems in your organization.",
      author: "Laura Wilson",
      date: "2023-11-28",
      readTime: "5 min read",
      category: "User Training",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      tags: ["Training", "User Adoption", "Change Management"],
    },
    {
      id: 20,
      title: "ROI Measurement in Asset Management",
      excerpt:
        "Learn how to measure and demonstrate the return on investment of your asset management initiatives.",
      author: "Andrew Garcia",
      date: "2023-11-25",
      readTime: "8 min read",
      category: "ROI Analysis",
      image:
        "https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=400&h=250&fit=crop",
      tags: ["ROI", "Metrics", "Performance Analysis"],
    },
  ];

  // Show only first 12 posts initially, or all if showAll is true
  const postsToShow = showAll ? blogPosts : blogPosts.slice(0, 12);
  const hasMorePosts = blogPosts.length > 12;

  const handleLoadMore = () => {
    setIsLoading(true);

    // Simulate loading time for better UX
    setTimeout(() => {
      setShowAll(true);
      setIsLoading(false);

      // Smooth scroll to show the newly loaded posts
      setTimeout(() => {
        const newPostsSection = document.querySelector(".grid");
        if (newPostsSection) {
          const firstNewPost = newPostsSection.children[12]; // 13th post (index 12)
          if (firstNewPost) {
            firstNewPost.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }
        }
      }, 100);
    }, 800); // 800ms loading simulation
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" {...pageAnimations.blog.title}>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral mb-4">
            AssetVerse Blog
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in
            asset management
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsToShow.map((post, index) => (
            <article
              key={post.id}
              className={`bg-base-100 rounded-2xl shadow-md border border-base-300 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                showAll && index >= 12 ? "animate-fade-in-up" : ""
              }`}
              style={
                showAll && index >= 12
                  ? { animationDelay: `${(index - 12) * 100}ms` }
                  : {}
              }
              {...pageAnimations.blog.card(index)}
            >
              {/* Post Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-content px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-neutral mb-3 line-clamp-2 hover:text-primary transition-colors">
                  <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                </h2>

                <p className="text-secondary mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Post Meta */}
                <div className="flex items-center justify-between text-sm text-secondary mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FiUser className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-base-200 text-neutral px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-secondary text-xs px-2 py-1">
                      +{post.tags.length - 2} more
                    </span>
                  )}
                </div>

                {/* Read More Button */}
                <Link
                  to={`/blogs/${post.id}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Read More
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {hasMorePosts && !showAll && (
          <div className="text-center mt-12" {...pageAnimations.blog.loadMore}>
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="btn btn-primary btn-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Loading More Posts...
                </>
              ) : (
                <>
                  Load More Posts
                  <span className="ml-2 bg-primary-content text-primary rounded-full px-2 py-1 text-sm font-bold">
                    +{blogPosts.length - 12}
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Show total count when all posts are visible */}
        {showAll && (
          <div className="text-center mt-12">
            <div className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-300 inline-block">
              <p className="text-secondary">
                Showing all{" "}
                <span className="font-bold text-primary">
                  {blogPosts.length}
                </span>{" "}
                blog posts
              </p>
              <p className="text-sm text-secondary/70 mt-1">
                Stay tuned for more insights and updates!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
