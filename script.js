// Local-only homepage rendering (no backend)
function fetchPostsLocal() {
    const posts = JSON.parse(localStorage.getItem('bloghub_posts') || '[]');
    return posts;
}

// Function to render posts on the homepage (index.html)
async function renderHomepagePosts() {
    const articlesList = document.querySelector('.articles-list');
    if (!articlesList) return;

    const posts = fetchPostsLocal();

    if (posts.length === 0) {
        articlesList.innerHTML = '<p style="text-align:center; color:#64748b;">No articles available yet.</p>';
        return;
    }

    articlesList.innerHTML = posts.map(post => `
        <div class="article-card" style="background:var(--card-bg); border-radius:1.5rem; box-shadow:0 4px 24px rgba(30,41,59,0.08); width:40%; min-width:340px; max-width:600px; padding:2.5rem 2rem 2rem; margin-bottom:2rem; transition: all 0.3s ease; position: relative; overflow: hidden;">
            <span style="display:inline-block; background:#2563EB; color:#fff; border-radius:1rem; padding:0.4rem 1.2rem; font-size:1rem; font-weight:600; margin-bottom:1rem;">${post.category}</span>
            <h3 style="color:var(--text-main); font-size:1.8rem; font-weight:700; margin-bottom:1rem;">${post.title}</h3>
            <div class="article-image" style="position: relative; margin: 0 -2rem 1.5rem -2rem;">
                <img src="${post.img}" alt="${post.title}" style="width:100%; height:200px; object-fit:cover;" loading="lazy">
            </div>
            <p style="color:var(--text-secondary); font-size:1.1rem; line-height:1.6; margin-bottom:1.5rem;">${post.content.substring(0, 200)}...</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom:1.5rem;">
                <div style="display: flex; gap: 1rem;">
                    <button style="background: none; border: none; color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="far fa-heart"></i>
                        <span>0</span>
                    </button>
                    <button style="background: none; border: none; color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="far fa-comment"></i>
                        <span>0</span>
                    </button>
                </div>
            <a href="dashboard.html" style="background: var(--primary-color); color: white; padding: 0.5rem 1.5rem; border-radius: 2rem; border: none; font-weight: 600; cursor: pointer; transition: all 0.3s ease; text-decoration: none;">Read More</a>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem; border-top: 1px solid #e5e7eb; padding-top: 1.5rem;">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Author" style="width: 40px; height: 40px; border-radius: 50%;" loading="lazy">
                <div>
                    <div style="color:var(--text-main); font-weight:600;">Author (ID: ${post.user_id})</div>
                    <div style="color:var(--text-secondary); font-size:0.9rem;">${new Date(post.created_at).toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// --- Event Listeners and Initial Calls ---
document.addEventListener('DOMContentLoaded', () => {
    // Handle logo click for homepage
    const homeLogo = document.getElementById('home-logo');
    if (homeLogo) {
        homeLogo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Initial render of homepage posts
    renderHomepagePosts();

    // Using localStorage for demo-only content, no backend required
});

// End of script