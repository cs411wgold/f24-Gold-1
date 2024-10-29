// Mock API functions
const api = {
    getForumInfo: async (forumId) => {
        const forumData = {
            math: {
                title: "Math Forum",
                description: "Discuss all things related to mathematics!",
                icon: "fa-calculator"
            },
            history: {
                title: "History Forum",
                description: "Explore the past and discuss any history courses.",
                icon: "fa-landmark"
            },
            study: {
                title: "Study Help Forum",
                description: "Share study tips and get help with your schoolwork.",
                icon: "fa-book"
            },
            english: {
                title: "English Forum",
                description: "Discuss literature, writing, and any language courses.",
                icon: "fa-pencil"
            },
            science: {
                title: "Science Forum",
                description: "Explore scientific topics and discuss any science courses.",
                icon: "fa-flask"
            }
        };
        return new Promise(resolve => setTimeout(() => resolve(forumData[forumId]), 100));
    },
    getPosts: async (forumId) => {
        const samplePosts = {
            math: [
                {
                    id: 1,
                    title: "Help with Calculus Integral",
                    content: "I'm struggling with this integral: ∫(x^2 + 2x + 1)dx. Can someone walk me through the steps on how to solve it?",
                    author: "User12345",
                    createdAt: "2024-10-11T10:00:00Z",
                    upvotes: 15,
                    downvotes: 2,
                    replies: [
                        {
                            id: 101,
                            content: "Sure! Let's break it down step by step...",
                            author: "User67890",
                            createdAt: "2024-10-11T10:30:00Z",
                            upvotes: 8,
                            downvotes: 0
                        }
                    ]
                },
                {
                    id: 7,
                    title: "Understanding Limit Properties",
                    content: "Can someone explain how to prove the limit of (sin x)/x as x approaches 0 equals 1?",
                    author: "User78901",
                    createdAt: "2024-10-11T12:00:00Z",
                    upvotes: 20,
                    downvotes: 3,
                    replies: [
                        {
                            id: 110,
                            content: "You can use L'Hopital's Rule or the Squeeze Theorem. Let me show you...",
                            author: "User12345",
                            createdAt: "2024-10-11T12:30:00Z",
                            upvotes: 10,
                            downvotes: 0,
                            replies: [
                                {
                                    id: 111,
                                    content: "Thanks! The Squeeze Theorem makes it so much easier.",
                                    author: "User78901",
                                    createdAt: "2024-10-11T13:00:00Z",
                                    upvotes: 3,
                                    downvotes: 0
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 8,
                    title: "Linear Algebra: Eigenvectors Confusion",
                    content: "I don’t understand how to find eigenvectors. Any help?",
                    author: "User90123",
                    createdAt: "2024-10-11T09:00:00Z",
                    upvotes: 17,
                    downvotes: 1,
                    replies: [
                        {
                            id: 112,
                            content: "You find them by solving (A - λI)x = 0. Start by finding the eigenvalues, then substitute.",
                            author: "User67890",
                            createdAt: "2024-10-11T09:30:00Z",
                            upvotes: 12,
                            downvotes: 0,
                            replies: [
                                {
                                    id: 113,
                                    content: "Ah, I see! So the eigenvalues are used in the equation first?",
                                    author: "User90123",
                                    createdAt: "2024-10-11T10:00:00Z",
                                    upvotes: 2,
                                    downvotes: 0
                                }
                            ]
                        }
                    ]
                }
            ],
            history: [
                {
                    id: 3,
                    title: "Unsung Heroes of World War II",
                    content: "Let's discuss some lesser-known heroes from WWII. I'll start with Nancy Wake, also known as 'The White Mouse'...",
                    author: "User12345",
                    createdAt: "2024-10-09T16:00:00Z",
                    upvotes: 45,
                    downvotes: 3,
                    replies: [
                        {
                            id: 102,
                            content: "Great topic! I'd like to add Witold Pilecki to the list...",
                            author: "User67890",
                            createdAt: "2024-10-09T17:15:00Z",
                            upvotes: 20,
                            downvotes: 1
                        }
                    ]
                },
                {
                    id: 9,
                    title: "How Did the French Revolution Change Society?",
                    content: "What were the major societal impacts of the French Revolution?",
                    author: "User12345",
                    createdAt: "2024-10-10T12:00:00Z",
                    upvotes: 32,
                    downvotes: 4,
                    replies: [
                        {
                            id: 120,
                            content: "The French Revolution abolished feudalism and established new ideals like liberty, equality, and fraternity.",
                            author: "User67890",
                            createdAt: "2024-10-10T12:45:00Z",
                            upvotes: 18,
                            downvotes: 0,
                            replies: [
                                {
                                    id: 121,
                                    content: "That’s really interesting. Did these changes impact neighboring countries as well?",
                                    author: "User78901",
                                    createdAt: "2024-10-10T13:15:00Z",
                                    upvotes: 5,
                                    downvotes: 0
                                },
                                {
                                    id: 122,
                                    content: "Yes, the Napoleonic Wars spread these ideas throughout Europe.",
                                    author: "User67890",
                                    createdAt: "2024-10-10T13:30:00Z",
                                    upvotes: 10,
                                    downvotes: 0
                                }
                            ]
                        }
                    ]
                }
            ],
            study: [
                {
                    id: 4,
                    title: "Effective Note-Taking Techniques",
                    content: "I've been trying different note-taking methods. Here's what worked best for me...",
                    author: "User12345",
                    createdAt: "2024-10-08T09:00:00Z",
                    upvotes: 67,
                    downvotes: 5,
                    replies: []
                },
                {
                    id: 10,
                    title: "Memorization Techniques for Exams",
                    content: "What are some good strategies to memorize lots of material for an exam?",
                    author: "User78901",
                    createdAt: "2024-10-09T11:00:00Z",
                    upvotes: 40,
                    downvotes: 6,
                    replies: [
                        {
                            id: 130,
                            content: "Try spaced repetition. Review your material at increasing intervals.",
                            author: "User67890",
                            createdAt: "2024-10-09T11:30:00Z",
                            upvotes: 25,
                            downvotes: 1,
                            replies: [
                                {
                                    id: 131,
                                    content: "I’ll give that a shot! Do you recommend any apps for this?",
                                    author: "User78901",
                                    createdAt: "2024-10-09T12:00:00Z",
                                    upvotes: 6,
                                    downvotes: 0
                                },
                                {
                                    id: 132,
                                    content: "Anki is a great tool for spaced repetition.",
                                    author: "User67890",
                                    createdAt: "2024-10-09T12:15:00Z",
                                    upvotes: 10,
                                    downvotes: 0
                                }
                            ]
                        }
                    ]
                }
            ],
            english: [
                {
                    id: 5,
                    title: "Analyzing Shakespeare's Sonnets",
                    content: "I'm writing a paper on Shakespeare's sonnets. Any insights on Sonnet 18?",
                    author: "User12345",
                    createdAt: "2024-10-07T11:00:00Z",
                    upvotes: 23,
                    downvotes: 2,
                    replies: [
                        {
                            id: 103,
                            content: "Sonnet 18 is fascinating! Let's look at the imagery...",
                            author: "User67890",
                            createdAt: "2024-10-07T12:30:00Z",
                            upvotes: 15,
                            downvotes: 0
                        }
                    ]
                },
                {
                    id: 11,
                    title: "Character Development in 'To Kill a Mockingbird'",
                    content: "What are some examples of character development in the book?",
                    author: "User12345",
                    createdAt: "2024-10-08T14:00:00Z",
                    upvotes: 28,
                    downvotes: 3,
                    replies: [
                        {
                            id: 140,
                            content: "Scout is a prime example. She evolves from innocence to understanding as she learns about racism and empathy.",
                            author: "User67890",
                            createdAt: "2024-10-08T14:45:00Z",
                            upvotes: 12,
                            downvotes: 0,
                            replies: [
                                {
                                    id: 141,
                                    content: "I agree! Her growth is so subtle yet powerful.",
                                    author: "User78901",
                                    createdAt: "2024-10-08T15:30:00Z",
                                    upvotes: 5,
                                    downvotes: 0
                                }
                            ]
                        }
                    ]
                }
            ],
            science: [
                {
                    id: 6,
                    title: "Latest Discoveries in Quantum Physics",
                    content: "Has anyone been following the recent breakthroughs in quantum computing?",
                    author: "User12345",
                    createdAt: "2024-10-06T17:00:00Z",
                    upvotes: 48,
                    downvotes: 4,
                    replies: []
                },
                {
                    id: 12,
                    title: "Physics of Black Holes",
                    content: "How does gravity work near black holes? Can someone explain the concept of event horizons?",
                    author: "User78901",
                    createdAt: "2024-10-10T10:00:00Z",
                    upvotes: 35,
                    downvotes: 2,
                    replies: [
                        {
                            id: 150,
                            content: "Gravity is so strong that not even light can escape past the event horizon. It's fascinating!",
                            author: "User67890",
                            createdAt: "2024-10-10T10:45:00Z",
                            upvotes: 20,
                            downvotes: 0,
                            replies: [
                                {
                                    id: 151,
                                    content: "So does that mean time behaves differently near black holes?",
                                    author: "User78901",
                                    createdAt: "2024-10-10T11:00:00Z",
                                    upvotes: 10,
                                    downvotes: 0
                                },
                                {
                                    id: 152,
                                    content: "Yes! Time dilation occurs, meaning time moves slower near the event horizon.",
                                    author: "User67890",
                                    createdAt: "2024-10-10T11:15:00Z",
                                    upvotes: 15,
                                    downvotes: 0
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        return new Promise(resolve => setTimeout(() => resolve(samplePosts[forumId]), 100));
    },
    createPost: async (forumId, postData) => {
        return new Promise(resolve => setTimeout(() => resolve({
            id: Date.now(),
            ...postData,
            author: "CurrentUser",
            createdAt: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0,
            replies: []
        }), 200));
    },
    createReply: async (postId, replyData) => {
        return new Promise(resolve => setTimeout(() => resolve({
            id: Date.now(),
            ...replyData,
            author: "CurrentUser",
            createdAt: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0
        }), 200));
    },
    vote: async (postId, value) => {
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 100));
    },
    voteReply: async (replyId, value) => {
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 100));
    },

    subscribeToThread: async (postId) => {
        return new Promise(resolve => setTimeout(() => resolve({
            success: true,
            subscribed: true
        }), 100));
    },
    unsubscribeFromThread: async (postId) => {
        return new Promise(resolve => setTimeout(() => resolve({
            success: true,
            subscribed: false
        }), 100));
    },
    getSubscriptionStatus: async (postId) => {
        return new Promise(resolve => setTimeout(() => resolve({
            subscribed: localStorage.getItem(`subscribed_${postId}`) === 'true'
        }), 100));
    }
};

// Add this after the api object
const userVotes = {
    posts: JSON.parse(localStorage.getItem('userPostVotes') || '{}'),
    replies: JSON.parse(localStorage.getItem('userReplyVotes') || '{}')
};

function saveVotes() {
    localStorage.setItem('userPostVotes', JSON.stringify(userVotes.posts));
    localStorage.setItem('userReplyVotes', JSON.stringify(userVotes.replies));
}

document.addEventListener('DOMContentLoaded', () => {
    const forumContent = document.getElementById('forum-content');
    const postsContainer = document.getElementById('posts-container');
    const postForm = document.getElementById('post-form');
    const forumId = new URLSearchParams(window.location.search).get('id');

    // Store subscriptions in localStorage
    const subscriptions = new Set(
        JSON.parse(localStorage.getItem('threadSubscriptions') || '[]')
    );

    async function loadForumContent() {
        try {
            const forum = await api.getForumInfo(forumId);
            forumContent.innerHTML = `
                <h1 class="mb-4">${forum.title}</h1>
                <div class="forum-info mb-4">
                    <i class="fas ${forum.icon} fa-3x me-3"></i>
                    <div>
                        <p class="mb-0">${forum.description}</p>
                    </div>
                </div>
            `;
        } catch (error) {
            forumContent.innerHTML = '<p>Error loading forum information.</p>';
        }
    }

    async function loadPosts() {
        try {
            const posts = await api.getPosts(forumId);
            postsContainer.innerHTML = posts.map(post => createPostHTML(post)).join('');
        } catch (error) {
            postsContainer.innerHTML = '<p>Error loading posts.</p>';
        }
    }

    function createPostHTML(post) {
        const isHidden = post.downvotes >= 10;
        const isSubscribed = subscriptions.has(post.id);
        const userVote = userVotes.posts[post.id] || 0;

        return `
        <div class="post card mb-3 ${isHidden ? 'flagged-post' : ''}" data-post-id="${post.id}">
            <div class="card-body">
                ${isHidden ? `
                    <div class="flagged-content alert alert-warning">
                        This post has been flagged due to community feedback.
                        <button class="btn btn-sm btn-link" onclick="toggleFlaggedContent(${post.id})">Show Content</button>
                    </div>
                    <div class="hidden-content" style="display: none;">
                ` : ''}
                
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.content}</p>
                
                ${isHidden ? '</div>' : ''}
                
                <div class="post-meta">
                    <small>Posted by ${post.author} on ${new Date(post.createdAt).toLocaleString()}</small>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <div class="vote-buttons">
                        <button class="btn btn-sm ${userVote === 1 ? 'btn-primary' : 'btn-outline-primary'} upvote-btn" 
                                onclick="vote(${post.id}, 1)" 
                                ${userVote === -1 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-up"></i> ${post.upvotes}
                        </button>
                        <button class="btn btn-sm ${userVote === -1 ? 'btn-danger' : 'btn-outline-danger'} downvote-btn" 
                                onclick="vote(${post.id}, -1)"
                                ${userVote === 1 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-down"></i> ${post.downvotes}
                        </button>
                        <button class="btn btn-sm ${isSubscribed ? 'btn-primary' : 'btn-outline-primary'} ms-2 subscribe-btn" 
                                onclick="toggleSubscription(${post.id})">
                            <i class="fas ${isSubscribed ? 'fa-bell-slash' : 'fa-bell'}"></i>
                            ${isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                        </button>
                    </div>
                    <button class="btn btn-sm btn-outline-secondary reply-btn" onclick="showReplyForm(${post.id})">Reply</button>
                </div>
                <div class="reply-form mt-3" style="display: none;">
                    <textarea class="form-control mb-2" placeholder="Write your reply..."></textarea>
                    <button class="btn btn-sm btn-primary" onclick="submitReply(${post.id})">Submit Reply</button>
                </div>
                <div class="replies mt-3">
                    ${post.replies.map(reply => createReplyHTML(reply, post.id)).join('')}
                </div>
            </div>
        </div>
    `;
    }

    // Enhanced reply HTML with moderation
    function createReplyHTML(reply, postId) {
        const isHidden = reply.downvotes >= 10;
        const userVote = userVotes.replies[reply.id] || 0;

        return `
        <div class="reply card mb-2 ${isHidden ? 'flagged-reply' : ''}" data-reply-id="${reply.id}">
            <div class="card-body">
                ${isHidden ? `
                    <div class="flagged-content alert alert-warning">
                        This reply has been flagged due to community feedback.
                        <button class="btn btn-sm btn-link" onclick="toggleFlaggedReply(${reply.id})">Show Content</button>
                    </div>
                    <div class="hidden-content" style="display: none;">
                ` : ''}
                
                <p class="card-text">${reply.content}</p>
                
                ${isHidden ? '</div>' : ''}
                
                <div class="reply-meta">
                    <small>Replied by ${reply.author} on ${new Date(reply.createdAt).toLocaleString()}</small>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <div class="vote-buttons">
                        <button class="btn btn-sm ${userVote === 1 ? 'btn-primary' : 'btn-outline-primary'} upvote-btn" 
                                onclick="voteReply(${reply.id}, 1)"
                                ${userVote === -1 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-up"></i> ${reply.upvotes}
                        </button>
                        <button class="btn btn-sm ${userVote === -1 ? 'btn-danger' : 'btn-outline-danger'} downvote-btn" 
                                onclick="voteReply(${reply.id}, -1)"
                                ${userVote === 1 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-down"></i> ${reply.downvotes}
                        </button>
                    </div>
                    <button class="btn btn-sm btn-outline-secondary reply-btn" onclick="showNestedReplyForm(${postId}, ${reply.id})">Reply</button>
                </div>
                <div class="nested-reply-form mt-2" style="display: none;">
                    <textarea class="form-control mb-2" placeholder="Write your reply..."></textarea>
                    <button class="btn btn-sm btn-primary" onclick="submitNestedReply(${postId}, ${reply.id})">Submit Reply</button>
                </div>
                ${reply.replies ? `
                <div class="nested-replies mt-2 ms-4">
                    ${reply.replies.map(nestedReply => createReplyHTML(nestedReply, postId)).join('')}
                </div>
                ` : ''}
            </div>
        </div>
    `;
    }

    // Toggle subscription status
    window.toggleSubscription = async function (postId) {
        try {
            if (subscriptions.has(postId)) {
                await api.unsubscribeFromThread(postId);
                subscriptions.delete(postId);
            } else {
                await api.subscribeToThread(postId);
                subscriptions.add(postId);
            }

            localStorage.setItem('threadSubscriptions', JSON.stringify([...subscriptions]));
            await loadPosts(); // Refresh the view
        } catch (error) {
            console.error('Error toggling subscription:', error);
        }
    };

    async function submitPost(event) {
        event.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        try {
            await api.createPost(forumId, { title, content });
            await loadPosts();
            postForm.reset();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    window.showReplyForm = function (postId) {
        const post = document.querySelector(`[data-post-id="${postId}"]`);
        post.querySelector('.reply-form').style.display = 'block';
    };

    window.showNestedReplyForm = function (postId, replyId) {
        const reply = document.querySelector(`[data-reply-id="${replyId}"]`);
        reply.querySelector('.nested-reply-form').style.display = 'block';
    };

    window.submitReply = async function (postId) {
        const post = document.querySelector(`[data-post-id="${postId}"]`);
        const replyContent = post.querySelector('.reply-form textarea').value;
        try {
            await api.createReply(postId, { content: replyContent });
            await loadPosts();
        } catch (error) {
            console.error('Error creating reply:', error);
        }
    };

    window.submitNestedReply = async function (postId, replyId) {
        const reply = document.querySelector(`[data-reply-id="${replyId}"]`);
        const nestedReplyContent = reply.querySelector('.nested-reply-form textarea').value;
        try {
            await api.createReply(postId, { content: nestedReplyContent, parentReplyId: replyId });
            await loadPosts();
        } catch (error) {
            console.error('Error creating nested reply:', error);
        }
    };

    window.vote = async function (postId, value) {
        try {
            const currentVote = userVotes.posts[postId] || 0;
            
            // If clicking the same vote button again, remove the vote
            if (currentVote === value) {
                value = 0;
            }
            
            // Update the post in the DOM immediately
            const post = document.querySelector(`[data-post-id="${postId}"]`);
            const upvoteBtn = post.querySelector('.upvote-btn');
            const downvoteBtn = post.querySelector('.downvote-btn');
            
            // Update vote counts
            const upvoteCount = parseInt(upvoteBtn.textContent);
            const downvoteCount = parseInt(downvoteBtn.textContent);
            
            if (currentVote === 1) upvoteBtn.textContent = ` ${upvoteCount - 1}`;
            if (currentVote === -1) downvoteBtn.textContent = ` ${downvoteCount - 1}`;
            if (value === 1) upvoteBtn.textContent = ` ${upvoteCount + 1}`;
            if (value === -1) downvoteBtn.textContent = ` ${downvoteCount + 1}`;
            
            // Update button states
            userVotes.posts[postId] = value;
            saveVotes();
            
            // Update UI without full reload
            upvoteBtn.className = `btn btn-sm ${value === 1 ? 'btn-primary' : 'btn-outline-primary'} upvote-btn`;
            downvoteBtn.className = `btn btn-sm ${value === -1 ? 'btn-danger' : 'btn-outline-danger'} downvote-btn`;
            upvoteBtn.disabled = value === -1;
            downvoteBtn.disabled = value === 1;
            
            await api.vote(postId, value);
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    window.voteReply = async function (replyId, value) {
        try {
            const currentVote = userVotes.replies[replyId] || 0;
            
            // If clicking the same vote button again, remove the vote
            if (currentVote === value) {
                value = 0;
            }
            
            // Update the reply in the DOM immediately
            const reply = document.querySelector(`[data-reply-id="${replyId}"]`);
            const upvoteBtn = reply.querySelector('.upvote-btn');
            const downvoteBtn = reply.querySelector('.downvote-btn');
            
            // Update vote counts
            const upvoteCount = parseInt(upvoteBtn.textContent);
            const downvoteCount = parseInt(downvoteBtn.textContent);
            
            if (currentVote === 1) upvoteBtn.textContent = ` ${upvoteCount - 1}`;
            if (currentVote === -1) downvoteBtn.textContent = ` ${downvoteCount - 1}`;
            if (value === 1) upvoteBtn.textContent = ` ${upvoteCount + 1}`;
            if (value === -1) downvoteBtn.textContent = ` ${downvoteCount + 1}`;
            
            // Update button states
            userVotes.replies[replyId] = value;
            saveVotes();
            
            // Update UI without full reload
            upvoteBtn.className = `btn btn-sm ${value === 1 ? 'btn-primary' : 'btn-outline-primary'} upvote-btn`;
            downvoteBtn.className = `btn btn-sm ${value === -1 ? 'btn-danger' : 'btn-outline-danger'} downvote-btn`;
            upvoteBtn.disabled = value === -1;
            downvoteBtn.disabled = value === 1;
            
            await api.voteReply(replyId, value);
        } catch (error) {
            console.error('Error voting on reply:', error);
        }
    };

    loadForumContent();
    loadPosts();
    postForm.addEventListener('submit', submitPost);
});