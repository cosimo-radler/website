document.addEventListener('DOMContentLoaded', () => {
  const blogGrid = document.querySelector('.blog-grid');
  const postTemplate = document.querySelector('#blog-post-template');
  const postView = document.querySelector('.blog-post-view');
  const closeBtn = document.querySelector('.close-post-btn');
  
  // Sample blog posts data - this would typically come from a CMS or API
  const blogPosts = [
    {
      id: 1,
      title: 'The Freedom of Being Accountable',
      date: 'April 17, 2025',
      image: 'assets/07B0E9A6-0576-4DBC-98CC-B39E90836C86_1_105_c.jpeg', // Using your uploaded image
      content: `<p>We often look for reasons why things aren't working out in our lives. External circumstances, other people, bad timing, or just plain bad luck. It's a natural human tendency – one I know all too well.</p>
<p>No one else but yourself is responsible for what's happening in your life. My generation, including myself, is brilliantly good at making excuses – for everything there is an excuse, but we never hold ourselves accountable. We have the autonomy to act in our lives, and the only one responsible for whether things work out or don't is yourself.</p>
<p>I think I have my phases with this. Sometimes I am great at taking my life into my own hands and stop waiting for things to magically happen. In other phases of my life, I can be quite passive, not wanting to make decisions, not wanting to make moves, and frankly waiting for things to magically figure themselves out. And in a way, being stuck in that phase, nearly a prisoner of the mind - seeing that it's not going to properly work yet not being able to do much about it. But most of the time we are just afraid, lazy, or too comfortable to make a decision. And that's okay, life sometimes is that way.</p>
<p>But we need to realize that it is our own responsibility to make decisions, take action or inaction, and no one else's. So if things work out, pat yourself on the back – good job. If things don't, then don't start blaming others for why it didn't work out; it is your own responsibility. Don't expect that life or anyone will figure things out for you. The only one who can do that is yourself, and sometimes it goes well and sometimes not, but you learn because you are accountable to yourself. We have agency, and it is our responsibility to make use of it.</p>
<p>This all might sound very harsh, emotionless, and cold. But it really is not, it's about embarking on the journey of yourself: the who are you, the what do you want to do, how do you want to do it, and why? What is the point of this anyway? Why am I happy or why am I not? What lights the fire within me and what puts out the flames? It is not at all about pure rationality or a lack of emotions - rather the opposite.</p>
<p>But we have to learn:</p>
<ol style="padding-left: 40px;">
  <li>That we have agency and have the ability to change things</li>
  <li>That no one else is responsible for our actions or inactions - it is merely ourselves</li>
</ol>
<p> </p>
<p>We need to hold ourselves accountable, not just in success but also in failures. It's not that we should beat ourselves down when we fail or do not succeed in whatever we arbitrarily have determined as success, or if we make a mistake. Beating yourself down doesn't help anyone. It is enough to recognize that we made a mistake - not someone else and not due to some external factor. Only we are responsible (of course outside things influence us, but only we are accountable for our own actions).</p>
<p>Realizing this and keeping oneself accountable has a compounding effect on our life. Through taking on agency and keeping oneself accountable, we realize that we have even more agency. The more we are accountable to ourselves, the more trust we have in what we do and how we do it, because we know we are honest with ourselves. All of us can nearly do anything if we want to and start doing it - to hold ourselves accountable to our dreams, wishes, and ideas. When we are honest with ourselves, we see our shortcomings, our mistakes, our excuses that we use to hide behind. Then we can truly grow, be open, and truly do anything we want to do.</p>
<p>And most importantly be our true self, authentically.</p>`
    }
    // Add more posts here as needed
  ];
  
  // Function to display the blog posts
  const displayBlogPosts = () => {
    if (blogPosts.length === 0) {
      // If no posts, show empty state message
      blogGrid.innerHTML = '<div class="blog-empty-state">No blog posts available yet. Check back soon!</div>';
      return;
    }
    
    // Clear the grid first
    blogGrid.innerHTML = '';
    
    // Add each post to the grid
    blogPosts.forEach(post => {
      // Clone the template
      const postElement = document.importNode(postTemplate.content, true);
      
      // Set the post data
      const link = postElement.querySelector('.blog-post-link');
      const image = postElement.querySelector('img');
      const title = postElement.querySelector('.blog-post-title');
      const date = postElement.querySelector('.blog-post-date');
      
      link.dataset.postId = post.id;
      image.src = post.image;
      image.alt = post.title;
      title.textContent = post.title;
      date.textContent = post.date;
      
      // Add click event to open the post
      link.addEventListener('click', (e) => {
        e.preventDefault();
        openPost(post.id);
      });
      
      // Add to the grid
      blogGrid.appendChild(postElement);
    });
  };
  
  // Function to open a blog post
  const openPost = (postId) => {
    const post = blogPosts.find(p => p.id === postId);
    
    if (!post) return;
    
    // Set the post content
    const title = postView.querySelector('.post-title');
    const date = postView.querySelector('.post-date');
    const image = postView.querySelector('.post-image img');
    const body = postView.querySelector('.post-body');
    
    title.textContent = post.title;
    date.textContent = post.date;
    image.src = post.image;
    image.alt = post.title;
    body.innerHTML = post.content;
    
    // Show the post view
    postView.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling of the main page
    
    // Add to browser history so back button works
    history.pushState({ postId }, post.title, `#post-${postId}`);
    
    // Track view in Vercel Analytics
    if (typeof window.va !== 'undefined') {
      // Track pageview with Vercel Analytics
      window.va('pageview', {
        url: window.location.href,
        title: post.title,
        referrer: document.referrer,
        path: `/blog/post/${postId}`,
        properties: {
          postId: postId,
          postTitle: post.title
        }
      });
    }
  };
  
  // Function to close a blog post
  const closePost = () => {
    postView.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
    
    // Go back in history if we're viewing a post
    if (window.location.hash.includes('post-')) {
      history.back();
    }
  };
  
  // Handle browser back/forward navigation
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.postId) {
      openPost(event.state.postId);
    } else {
      postView.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  // Add event listener to close button
  closeBtn.addEventListener('click', closePost);
  
  // Check for hash in URL on page load (e.g., #post-1)
  if (window.location.hash.includes('post-')) {
    const postId = parseInt(window.location.hash.replace('#post-', ''));
    openPost(postId);
  }
  
  // Display the blog posts
  displayBlogPosts();
}); 