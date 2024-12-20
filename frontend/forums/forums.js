// Mock API functions
const api = {
 /**
 * Get forum information based on the forum ID.
 * @async
 * @param {string} forumId - The ID of the forum to retrieve information for.
 * @returns {Promise<Object>} The forum data containing title, description, and icon.
 */
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

    /**
     * Get posts for a specific forum
     * @param {string} forumId - The ID of the forum to retrieve posts from
     * @returns {Promise<Array>} An array of posts
     */
    getPosts: async (forumId) => {
        // Get posts from localStorage or use default data
        const storedPosts = localStorage.getItem(`forum_posts_${forumId}`);
        if (storedPosts) {
            return JSON.parse(storedPosts);
        }
        
        // If no stored posts, use the sample data and store it
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
                },
                {
                    id: 13,
                    title: "Test Flagged Post",
                    content: "This is a test post that should be flagged due to having 10+ downvotes.",
                    author: "User12345",
                    createdAt: new Date().toISOString(),
                    upvotes: 2,
                    downvotes: 15,
                    replies: [
                        {
                            id: 160,
                            content: "This is a test reply that should also be flagged.",
                            author: "User67890",
                            createdAt: new Date().toISOString(),
                            upvotes: 1,
                            downvotes: 12,
                            replies: []
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
        
        localStorage.setItem(`forum_posts_${forumId}`, JSON.stringify(samplePosts[forumId]));
        return samplePosts[forumId];
    },

   /**
    * Create a new post in the specified forum.
    * @async
    * @param {string} forumId - The ID of the forum to create the post in.
    * @param {Object} postData - The data of the post to be created.
    * @returns {Promise<Object>} The newly created post object.
    */
    createPost: async (forumId, postData) => {
        const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
        const newPost = {
            id: Date.now(),
            ...postData,
            author: "jimbo",
            createdAt: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0,
            replies: []
        };
        
        posts.unshift(newPost); // Add new post at the beginning
        localStorage.setItem(`forum_posts_${forumId}`, JSON.stringify(posts));
        return newPost;
    },

    /**
     * Create a new reply to a post in the specified forum.
     * @async
     * @param {number} postId - The ID of the post to reply to.
     * @param {Object} replyData - The data of the reply to be created.
     * @returns {Promise<Object>} The newly created reply object.
     */
    createReply: async (postId, replyData) => {
        const forumId = new URLSearchParams(window.location.search).get('id');
        const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
        
        const newReply = {
            id: Date.now(),
            ...replyData,
            author: "jimbo",
            createdAt: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0
        };

        /**
         * Add a reply to a post or nested reply.
         * @param {Object} post - The post object to add the reply to.
         */
        function addReplyToPost(post) {
            if (replyData.parentReplyId) {
                /** Add nested reply */
                const findAndAddReply = (replies) => {
                    for (let reply of replies) {
                        if (reply.id === replyData.parentReplyId) {
                            reply.replies = reply.replies || [];
                            reply.replies.push(newReply);
                            return true;
                        }
                        if (reply.replies && findAndAddReply(reply.replies)) {
                            return true;
                        }
                    }
                    return false;
                };
                findAndAddReply(post.replies);
            } else {
                // Add direct reply to post
                post.replies = post.replies || [];
                post.replies.push(newReply);
            }
        }

        // Find the post and add the reply
        const post = posts.find(p => p.id === postId);
        if (post) {
            addReplyToPost(post);
            localStorage.setItem(`forum_posts_${forumId}`, JSON.stringify(posts));
            
            // Check if anyone is subscribed to this thread and notify them
            const subscriptions = JSON.parse(localStorage.getItem('threadSubscriptions') || '[]');
            if (subscriptions.includes(postId)) {
                notifications.add({
                    id: Date.now(),
                    message: `New reply in "${post.title}"`,
                    postId: postId,
                    createdAt: new Date().toISOString()
                });
            }
        }

        return newReply;
    },

    /**
     * Vote on a post.
     * @async
     * @param {number} postId - The ID of the post to vote on.
     * @param {number} value - The value of the vote (1 for upvote, -1 for downvote).
     * @returns {Promise<Object>} A promise that resolves to an object indicating success.
     */
    vote: async (postId, value) => {
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 100));
    },

    /**
     * Vote on a reply.
     * @async
     * @param {number} replyId - The ID of the reply to vote on.
     * @param {number} value - The value of the vote (1 for upvote, -1 for downvote).
     * @returns {Promise<Object>} A promise that resolves to an object indicating success.
     */
    voteReply: async (replyId, value) => {
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 100));
    },

    /**
     * Subscribe to a thread.
     * @async
     * @param {number} postId - The ID of the post to subscribe to.
     * @returns {Promise<Object>} A promise that resolves to an object indicating success.
     */
    subscribeToThread: async (postId) => {
        return new Promise(resolve => setTimeout(() => resolve({
            success: true,
            subscribed: true
        }), 100));
    },

    /**
     * Unsubscribe from a thread.
     * @async
     * @param {number} postId - The ID of the post to unsubscribe from.
     * @returns {Promise<Object>} A promise that resolves to an object indicating success.
     */
    unsubscribeFromThread: async (postId) => {
        return new Promise(resolve => setTimeout(() => resolve({
            success: true,
            subscribed: false
        }), 100));
    },

    /**
     * Get the subscription status of a thread.
     * @async
     * @param {number} postId - The ID of the post to get the subscription status for.
     * @returns {Promise<Object>} A promise that resolves to an object indicating the subscription status.
     */
    getSubscriptionStatus: async (postId) => {
        return new Promise(resolve => setTimeout(() => resolve({
            subscribed: localStorage.getItem(`subscribed_${postId}`) === 'true'
        }), 100));
    },

    /**
     * Delete a post.
     * @async
     * @param {string} forumId - The ID of the forum containing the post.
     * @param {number} postId - The ID of the post to delete.
     * @returns {Promise<Object>} A promise that resolves to an object indicating success.
     */
    deletePost: async (forumId, postId) => {
        const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
        const updatedPosts = posts.filter(post => post.id !== postId);
        localStorage.setItem(`forum_posts_${forumId}`, JSON.stringify(updatedPosts));
        return { success: true };
    },

    /**
     * Delete a reply.
     * @async
     * @param {string} forumId - The ID of the forum containing the post.
     * @param {number} postId - The ID of the post containing the reply.
     * @param {number} replyId - The ID of the reply to delete.
     * @returns {Promise<Object>} A promise that resolves to an object indicating success.
     */
    deleteReply: async (forumId, postId, replyId) => {
        const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            /** Function to remove reply recursively */ 
            const removeReply = (replies) => {
                const index = replies.findIndex(r => r.id === replyId);
                if (index !== -1) {
                    replies.splice(index, 1);
                    return true;
                }
                return replies.some(reply => reply.replies && removeReply(reply.replies));
            };
            
            removeReply(post.replies);
            localStorage.setItem(`forum_posts_${forumId}`, JSON.stringify(posts));
        }
        return { success: true };
    },

    /**
     * Edit a post.
     * @async
     * @param {string} forumId - The ID of the forum containing the post.
     * @param {number} postId - The ID of the post to edit.
     * @param {string} newContent - The new content for the post.
     * @returns {Promise<Object>} A promise that resolves to an object indicating success.
     */
    editPost: async (forumId, postId, newContent) => {
        const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.content = newContent;
            post.edited = true;
            post.editedAt = new Date().toISOString();
            localStorage.setItem(`forum_posts_${forumId}`, JSON.stringify(posts));
        }
        return { success: true };
    },

    /**
     * Edit a reply.
     * @async
     * @param {string} forumId - The ID of the forum containing the post.
     * @param {number} postId - The ID of the post containing the reply.
     * @param {number} replyId - The ID of the reply to edit.
     * @param {string} newContent - The new content for the reply.
     * @returns {Promise<Object>} A promise that resolves to an object indicating success.
     */
    editReply: async (forumId, postId, replyId, newContent) => {
        const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            /**  Function to edit reply recursively */
            const editReplyContent = (replies) => {
                const reply = replies.find(r => r.id === replyId);
                if (reply) {
                    reply.content = newContent;
                    reply.edited = true;
                    reply.editedAt = new Date().toISOString();
                    return true;
                }
                return replies.some(r => r.replies && editReplyContent(r.replies));
            };
            
            editReplyContent(post.replies);
            localStorage.setItem(`forum_posts_${forumId}`, JSON.stringify(posts));
        }
        return { success: true };
    }
};

// Add this after the api object
const userVotes = {
    posts: JSON.parse(localStorage.getItem('userPostVotes') || '{}'),
    replies: JSON.parse(localStorage.getItem('userReplyVotes') || '{}')
};

/**
 * Save user votes to localStorage.
 */
function saveVotes() {
    localStorage.setItem('userPostVotes', JSON.stringify(userVotes.posts));
    localStorage.setItem('userReplyVotes', JSON.stringify(userVotes.replies));
}

// Add after userVotes object
const notifications = {
    list: JSON.parse(localStorage.getItem('notifications') || '[]'),
    
    /**
     * Add a notification to the list and show a toast.
     * @param {Object} notification - The notification object to add.
     */
    add: function(notification) {
        this.list.unshift(notification);
        localStorage.setItem('notifications', JSON.stringify(this.list));
        this.showToast(notification);
    },
    
    /**
     * Show a toast notification.
     * @param {Object} notification - The notification object to display.
     */
    showToast: function(notification) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.setAttribute('data-notification-type', notification.type || 'reply');
        
        /**
         * Get the icon for the toast based on the notification type.
         * @param {string} type - The type of notification.
         * @returns {string} The icon for the toast.
         */
        const getToastIcon = (type) => {
            switch(type) {
                case 'edit':
                    return '<i class="fas fa-edit me-2"></i>';
                default:
                    return '<img src="../resources/tomato.png" class="me-2" alt="Tomato" style="width: 20px; height: 20px;">';
            }
        };
        
        /**
         * Get the title for the toast based on the notification type.
         * @param {string} type - The type of notification.
         * @returns {string} The title for the toast.
         */
        const getToastTitle = (type) => {
            switch(type) {
                case 'edit':
                    return 'Post Edited';
                default:
                    return 'New Reply';
            }
        };
        
        toast.innerHTML = `
            <div class="toast-header">
                ${getToastIcon(notification.type)}
                <strong class="me-auto">${getToastTitle(notification.type)}</strong>
                <small>${new Date(notification.createdAt).toLocaleTimeString()}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${notification.message}
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Remove toast after 10 seconds
        setTimeout(() => {
            toast.remove();
        }, 10000);
    }
};


const POSTS_PER_PAGE = 5; // Max number of posts per page
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    const forumContent = document.getElementById('forum-content');
    const postsContainer = document.getElementById('posts-container');
    const postForm = document.getElementById('post-form');
    const forumId = new URLSearchParams(window.location.search).get('id');

    // Store subscriptions in localStorage
    const subscriptions = new Set(
        JSON.parse(localStorage.getItem('threadSubscriptions') || '[]')
    );

    /**
     * Load forum content.
     */
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
                <div class="d-flex justify-content-end mb-3">
                    <select id="sort-select" class="form-select" style="width: auto;">
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="most-upvoted">Most Upvoted</option>
                    </select>
                </div>
            `;

            // Add event listener for sort selection
            document.getElementById('sort-select').addEventListener('change', loadPosts);
        } catch (error) {
            forumContent.innerHTML = '<p>Error loading forum information.</p>';
        }
    }

    /**
     * Load posts for the current forum.
     */
    async function loadPosts() {
        try {
            const posts = await api.getPosts(forumId);
            const sortSelect = document.getElementById('sort-select');
            const sortMethod = sortSelect ? sortSelect.value : 'newest';
            
            // Sort posts based on selected method
            const sortedPosts = [...posts].sort((a, b) => {
                switch (sortMethod) {
                    case 'newest':
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    case 'oldest':
                        return new Date(a.createdAt) - new Date(b.createdAt);
                    case 'most-upvoted':
                        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
                    default:
                        return new Date(b.createdAt) - new Date(a.createdAt);
                }
            });

            // Calculate pagination
            const totalPosts = sortedPosts.length;
            const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
            const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
            const endIndex = startIndex + POSTS_PER_PAGE;
            const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
            
            // Render posts and pagination controls
            postsContainer.innerHTML = `
                ${paginatedPosts.map(post => createPostHTML(post)).join('')}
                <div class="pagination-controls d-flex justify-content-center align-items-center mt-4">
                    <button class="btn btn-outline-primary me-2" 
                            onclick="changePage(${currentPage - 1})"
                            ${currentPage === 1 ? 'disabled' : ''}>
                        Previous
                    </button>
                    <span class="mx-3">
                        Page ${currentPage} of ${totalPages}
                    </span>
                    <button class="btn btn-outline-primary ms-2" 
                            onclick="changePage(${currentPage + 1})"
                            ${currentPage === totalPages ? 'disabled' : ''}>
                        Next
                    </button>
                </div>
            `;
        } catch (error) {
            console.error('Error loading posts:', error);
            postsContainer.innerHTML = '<p>Error loading posts.</p>';
        }
    }

    /**
     * Create HTML for a post.
     * @param {Object} post - The post object to create HTML for.
     * @returns {string} The HTML string for the post.
     */
    function createPostHTML(post) {
        const isHidden = post.downvotes >= 10;
        const isSubscribed = subscriptions.has(post.id);
        const userVote = userVotes.posts[post.id] || 0;
        
        /**
         * Add avatar mapping
         */
        const avatarMap = {
            'User12345': '../img/avatars/tomato_warrior.png',
            'User67890': '../img/avatars/timer_beginner.png',
            'User78901': '../img/avatars/grade_tracker_1.png',
            'User90123': '../img/avatars/tomato_bundle.png',
            'jimbo': '../img/avatars/new_user_seedling.png'
        };

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
                    
                    <div class="d-flex align-items-start">
                        <img src="${avatarMap[post.author] || '../img/avatars/new_user_seedling.png'}" 
                             alt="avatar" 
                             class="rounded-circle me-3" 
                             style="width: 50px; height: 50px; object-fit: cover;">
                        <div class="flex-grow-1">
                            <h5 class="card-title">${post.title}</h5>
                            <div class="post-content" id="post-content-${post.id}">
                                <p class="card-text">${post.content}</p>
                            </div>
                            <div class="edit-form" id="edit-form-${post.id}" style="display: none;">
                                <textarea class="form-control mb-2">${post.content}</textarea>
                                <button class="btn btn-sm btn-primary" onclick="submitPostEdit(${post.id})">Save</button>
                                <button class="btn btn-sm btn-secondary" onclick="cancelPostEdit(${post.id})">Cancel</button>
                            </div>
                        </div>
                    </div>
                    
                    ${isHidden ? '</div>' : ''}
                    
                    <div class="post-meta mt-2">
                        <small>
                            Posted by ${post.author} on ${new Date(post.createdAt).toLocaleString()}
                            ${post.edited ? `(edited ${new Date(post.editedAt).toLocaleString()})` : ''}
                        </small>
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
                        <div class="action-buttons">
                            ${post.author === 'jimbo' ? `
                                <button class="btn btn-sm btn-outline-primary me-2" onclick="editPost(${post.id})">Edit</button>
                                <button class="btn btn-sm btn-outline-danger me-2" onclick="deletePost(${post.id})">Delete</button>
                            ` : ''}
                            <button class="btn btn-sm btn-outline-secondary reply-btn" onclick="showReplyForm(${post.id})">Reply</button>
                        </div>
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

    /**
     * Create HTML for a reply.
     * @param {Object} reply - The reply object to create HTML for.
     * @param {number} postId - The ID of the post containing the reply.
     * @returns {string} The HTML string for the reply.
     */
    function createReplyHTML(reply, postId) {
        const isHidden = reply.downvotes >= 10;
        const userVote = userVotes.replies[reply.id] || 0;
        
        // Use the same avatar mapping
        const avatarMap = {
            'User12345': '../img/avatars/tomato_warrior.png',
            'User67890': '../img/avatars/timer_beginner.png',
            'User78901': '../img/avatars/grade_tracker_1.png',
            'User90123': '../img/avatars/tomato_bundle.png',
            'jimbo': '../img/avatars/new_user_seedling.png'
        };

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
                    
                    <div class="d-flex align-items-start">
                        <img src="${avatarMap[reply.author] || '../img/avatars/new_user_seedling.png'}" 
                             alt="avatar" 
                             class="rounded-circle me-3" 
                             style="width: 40px; height: 40px; object-fit: cover;">
                        <div class="flex-grow-1">
                            <div class="reply-content" id="reply-content-${reply.id}">
                                <p class="card-text">${reply.content}</p>
                            </div>
                            <div class="edit-form" id="edit-form-reply-${reply.id}" style="display: none;">
                                <textarea class="form-control mb-2">${reply.content}</textarea>
                                <button class="btn btn-sm btn-primary" onclick="submitReplyEdit(${postId}, ${reply.id})">Save</button>
                                <button class="btn btn-sm btn-secondary" onclick="cancelReplyEdit(${reply.id})">Cancel</button>
                            </div>
                        </div>
                    </div>
                    
                    ${isHidden ? '</div>' : ''}
                    
                    <div class="reply-meta mt-2">
                        <small>
                            Replied by ${reply.author} on ${new Date(reply.createdAt).toLocaleString()}
                            ${reply.edited ? `(edited ${new Date(reply.editedAt).toLocaleString()})` : ''}
                        </small>
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
                        <div class="action-buttons">
                            ${reply.author === 'jimbo' ? `
                                <button class="btn btn-sm btn-outline-primary me-2" onclick="editReply(${postId}, ${reply.id})">Edit</button>
                                <button class="btn btn-sm btn-outline-danger me-2" onclick="deleteReply(${postId}, ${reply.id})">Delete</button>
                            ` : ''}
                            <button class="btn btn-sm btn-outline-secondary reply-btn" onclick="showNestedReplyForm(${postId}, ${reply.id})">Reply</button>
                        </div>
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

    /**
     * Toggle subscription status.
     * @param {number} postId - The ID of the post to toggle subscription for.
     */
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
            
            // Update just the subscription button without reloading all posts
            const post = document.querySelector(`[data-post-id="${postId}"]`);
            const subscribeBtn = post.querySelector('.subscribe-btn');
            const isSubscribed = subscriptions.has(postId);
            
            subscribeBtn.className = `btn btn-sm ${isSubscribed ? 'btn-primary' : 'btn-outline-primary'} ms-2 subscribe-btn`;
            subscribeBtn.innerHTML = `
                <i class="fas ${isSubscribed ? 'fa-bell-slash' : 'fa-bell'}"></i>
                ${isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            `;
        } catch (error) {
            console.error('Error toggling subscription:', error);
        }
    };

    /**
     * Submit a new post.
     * @param {Event} event - The event object.
     */
    async function submitPost(event) {
        event.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        
        if (!title.trim() || !content.trim()) return;
        
        try {
            await api.createPost(forumId, { title, content });
            postForm.reset();
            currentPage = 1; // Reset to first page
            await loadPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    /**
     * Show the reply form for a post.
     * @param {number} postId - The ID of the post to show the reply form for.
     */
    window.showReplyForm = function (postId) {
        const post = document.querySelector(`[data-post-id="${postId}"]`);
        post.querySelector('.reply-form').style.display = 'block';
    };

    /**
     * Show the nested reply form for a reply.
     * @param {number} postId - The ID of the post containing the reply.
     * @param {number} replyId - The ID of the reply to show the nested reply form for.
     */
    window.showNestedReplyForm = function (postId, replyId) {
        const reply = document.querySelector(`[data-reply-id="${replyId}"]`);
        reply.querySelector('.nested-reply-form').style.display = 'block';
    };

    /**
     * Submit a reply to a post.
     * @param {number} postId - The ID of the post to submit the reply to.
     */
    window.submitReply = async function (postId) {
        const post = document.querySelector(`[data-post-id="${postId}"]`);
        const replyContent = post.querySelector('.reply-form textarea').value;
        if (!replyContent.trim()) return; // Don't submit empty replies
        
        try {
            await api.createReply(postId, { content: replyContent });
            post.querySelector('.reply-form').style.display = 'none'; // Hide form after submission
            post.querySelector('.reply-form textarea').value = ''; // Clear textarea
            await loadPosts(); // Refresh the posts to show new reply
        } catch (error) {
            console.error('Error creating reply:', error);
        }
    };

    /**
     * Submit a nested reply to a reply.
     * @param {number} postId - The ID of the post containing the reply.
     * @param {number} replyId - The ID of the reply to submit the nested reply to.
     */
    window.submitNestedReply = async function (postId, replyId) {
        const reply = document.querySelector(`[data-reply-id="${replyId}"]`);
        const nestedReplyContent = reply.querySelector('.nested-reply-form textarea').value;
        if (!nestedReplyContent.trim()) return; // Don't submit empty replies
        
        try {
            await api.createReply(postId, { 
                content: nestedReplyContent, 
                parentReplyId: replyId 
            });
            reply.querySelector('.nested-reply-form').style.display = 'none'; // Hide form after submission
            reply.querySelector('.nested-reply-form textarea').value = ''; // Clear textarea
            await loadPosts(); // Refresh the posts to show new reply
        } catch (error) {
            console.error('Error creating nested reply:', error);
        }
    };

    /**
     * Vote on a post.
     * @param {number} postId - The ID of the post to vote on.
     * @param {number} value - The value of the vote (1 for upvote, -1 for downvote).
     */
    window.vote = async function (postId, value) {
        try {
            const currentVote = userVotes.posts[postId] || 0;
            const forumId = new URLSearchParams(window.location.search).get('id');
            
            // If clicking the same vote button again, remove the vote
            if (currentVote === value) {
                value = 0;
            }
            
            // Get posts from localStorage and update the vote counts
            const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
            const post = posts.find(p => p.id === postId);
            
            if (post) {
                // Remove previous vote if it exists
                if (currentVote === 1) post.upvotes--;
                if (currentVote === -1) post.downvotes--;
                
                // Add new vote
                if (value === 1) post.upvotes++;
                if (value === -1) post.downvotes++;
                
                // Save updated posts back to localStorage
                localStorage.setItem(`forum_posts_${forumId}`, JSON.stringify(posts));
            }
            
            // Update the post in the DOM immediately
            const postElement = document.querySelector(`[data-post-id="${postId}"]`);
            const upvoteBtn = postElement.querySelector('.upvote-btn');
            const downvoteBtn = postElement.querySelector('.downvote-btn');
            
            // Update button states
            userVotes.posts[postId] = value;
            saveVotes();
            
            // Update UI without full reload
            upvoteBtn.innerHTML = `<i class="fas fa-arrow-up"></i> ${post.upvotes}`;
            downvoteBtn.innerHTML = `<i class="fas fa-arrow-down"></i> ${post.downvotes}`;
            upvoteBtn.className = `btn btn-sm ${value === 1 ? 'btn-primary' : 'btn-outline-primary'} upvote-btn`;
            downvoteBtn.className = `btn btn-sm ${value === -1 ? 'btn-danger' : 'btn-outline-danger'} downvote-btn`;
            upvoteBtn.disabled = value === -1;
            downvoteBtn.disabled = value === 1;
            
            await api.vote(postId, value);
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    /**
     * Vote on a reply.
     * @param {number} replyId - The ID of the reply to vote on.
     * @param {number} value - The value of the vote (1 for upvote, -1 for downvote).
     */
    window.voteReply = async function (replyId, value) {
        try {
            const currentVote = userVotes.replies[replyId] || 0;
            const forumId = new URLSearchParams(window.location.search).get('id');
            
            // If clicking the same vote button again, remove the vote
            if (currentVote === value) {
                value = 0;
            }
            
            // Get posts from localStorage and find the reply
            const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
            
            /**
             * Update the vote counts for a reply and its nested replies.
             * @param {Array} replies - The array of replies to update.
             * @returns {boolean} True if the reply was found and updated, false otherwise.
             */
            const updateReplyVotes = (replies) => {
                for (let reply of replies) {
                    if (reply.id === replyId) {
                        // Remove previous vote if it exists
                        if (currentVote === 1) reply.upvotes--;
                        if (currentVote === -1) reply.downvotes--;
                        
                        // Add new vote
                        if (value === 1) reply.upvotes++;
                        if (value === -1) reply.downvotes++;
                        return true;
                    }
                    if (reply.replies && updateReplyVotes(reply.replies)) {
                        return true;
                    }
                }
                return false;
            };
            
            // Update votes in all posts' replies
            posts.forEach(post => {
                if (post.replies) {
                    updateReplyVotes(post.replies);
                }
            });
            
            // Save updated posts back to localStorage
            localStorage.setItem(`forum_posts_${forumId}`, JSON.stringify(posts));
            
            // Update the reply in the DOM immediately
            const reply = document.querySelector(`[data-reply-id="${replyId}"]`);
            const upvoteBtn = reply.querySelector('.upvote-btn');
            const downvoteBtn = reply.querySelector('.downvote-btn');
            
            // Find the current vote counts
            const replyData = findReplyById(posts, replyId);
            if (replyData) {
                upvoteBtn.innerHTML = `<i class="fas fa-arrow-up"></i> ${replyData.upvotes}`;
                downvoteBtn.innerHTML = `<i class="fas fa-arrow-down"></i> ${replyData.downvotes}`;
            }
            
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

    /**
     * Find a reply by ID.
     * @param {Array} posts - The array of posts to search through.
     * @param {number} replyId - The ID of the reply to find.
     * @returns {Object|null} The reply object if found, null otherwise.
     */
    function findReplyById(posts, replyId) {
        /**
         * Searches through the given replies.
         *
         * @param {Array} replies - The array of replies to search through.
         */        
        const searchReplies = (replies) => {
            for (let reply of replies) {
                if (reply.id === replyId) {
                    return reply;
                }
                if (reply.replies) {
                    const found = searchReplies(reply.replies);
                    if (found) return found;
                }
            }
            return null;
        };
        
        for (let post of posts) {
            if (post.replies) {
                const found = searchReplies(post.replies);
                if (found) return found;
            }
        }
        return null;
    }

    /**
     * Toggle flagged content for a post.
     * @param {number} postId - The ID of the post to toggle flagged content for.
     */
    window.toggleFlaggedContent = function(postId) {
        const post = document.querySelector(`[data-post-id="${postId}"]`);
        const hiddenContent = post.querySelector('.hidden-content');
        hiddenContent.style.display = hiddenContent.style.display === 'none' ? 'block' : 'none';
    };

    /**
     * Toggle flagged content for a reply.
     * @param {number} replyId - The ID of the reply to toggle flagged content for.
     */
    window.toggleFlaggedReply = function(replyId) {
        const reply = document.querySelector(`[data-reply-id="${replyId}"]`);
        const hiddenContent = reply.querySelector('.hidden-content');
        hiddenContent.style.display = hiddenContent.style.display === 'none' ? 'block' : 'none';
    };

    /**
     * Edit a post.
     * @param {number} postId - The ID of the post to edit.
     */
    window.editPost = function(postId) {
        const post = document.querySelector(`[data-post-id="${postId}"]`);
        post.querySelector(`#post-content-${postId}`).style.display = 'none';
        post.querySelector(`#edit-form-${postId}`).style.display = 'block';
    };

    /**
     * Cancel the edit of a post.
     * @param {number} postId - The ID of the post to cancel the edit for.
     */
    window.cancelPostEdit = function(postId) {
        const post = document.querySelector(`[data-post-id="${postId}"]`);
        post.querySelector(`#post-content-${postId}`).style.display = 'block';
        post.querySelector(`#edit-form-${postId}`).style.display = 'none';
    };

    /**
     * Submit the edited content of a post.
     * @param {number} postId - The ID of the post to submit the edited content for.
     */
    window.submitPostEdit = async function(postId) {
        const forumId = new URLSearchParams(window.location.search).get('id');
        const post = document.querySelector(`[data-post-id="${postId}"]`);
        const newContent = post.querySelector(`#edit-form-${postId} textarea`).value;

        try {
            await api.editPost(forumId, postId, newContent);

            // Check if anyone is subscribed to this thread and notify them
            const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
            const editedPost = posts.find(p => p.id === postId);
            const subscriptions = JSON.parse(localStorage.getItem('threadSubscriptions') || '[]');

            if (subscriptions.includes(postId) && editedPost) {
                notifications.add({
                    id: Date.now(),
                    message: `Post "${editedPost.title}" has been edited`,
                    postId: postId,
                    type: 'edit',
                    createdAt: new Date().toISOString()
                });
            }

            await loadPosts(); // Refresh the posts
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };

    /**
     * Delete a post.
     * @param {number} postId - The ID of the post to delete.
     */
    window.deletePost = async function(postId) {
        if (!confirm('Are you sure you want to delete this post?')) return;
        
        const forumId = new URLSearchParams(window.location.search).get('id');
        try {
            // Get post information before deletion
            const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
            const postToDelete = posts.find(p => p.id === postId);
            const subscriptions = JSON.parse(localStorage.getItem('threadSubscriptions') || '[]');

            await api.deletePost(forumId, postId);

            // Notify subscribers about the deletion
            if (subscriptions.includes(postId) && postToDelete) {
                notifications.add({
                    id: Date.now(),
                    message: `Post "${postToDelete.title}" has been deleted`,
                    type: 'delete',
                    createdAt: new Date().toISOString()
                });
            }

            await loadPosts(); // Refresh the posts
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    /**
     * Edit a reply.
     * @param {number} postId - The ID of the post containing the reply.
     * @param {number} replyId - The ID of the reply to edit.
     */
    window.editReply = function(postId, replyId) {
        const reply = document.querySelector(`[data-reply-id="${replyId}"]`);
        reply.querySelector(`#reply-content-${replyId}`).style.display = 'none';
        reply.querySelector(`#edit-form-reply-${replyId}`).style.display = 'block';
    };

    /**
     * Cancel the edit of a reply.
     * @param {number} replyId - The ID of the reply to cancel the edit for.
     */
    window.cancelReplyEdit = function(replyId) {
        const reply = document.querySelector(`[data-reply-id="${replyId}"]`);
        reply.querySelector(`#reply-content-${replyId}`).style.display = 'block';
        reply.querySelector(`#edit-form-reply-${replyId}`).style.display = 'none';
    };

    /**
     * Submit the edited content of a reply.
     * @param {number} postId - The ID of the post containing the reply.
     * @param {number} replyId - The ID of the reply to submit the edited content for.
     */
    window.submitReplyEdit = async function(postId, replyId) {
        const forumId = new URLSearchParams(window.location.search).get('id');
        const reply = document.querySelector(`[data-reply-id="${replyId}"]`);
        const newContent = reply.querySelector(`#edit-form-reply-${replyId} textarea`).value;

        try {
            await api.editReply(forumId, postId, replyId, newContent);

            // Check if anyone is subscribed to this thread and notify them
            const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
            const parentPost = posts.find(p => p.id === postId);
            const subscriptions = JSON.parse(localStorage.getItem('threadSubscriptions') || '[]');

            if (subscriptions.includes(postId) && parentPost) {
                notifications.add({
                    id: Date.now(),
                    message: `A reply in "${parentPost.title}" has been edited`,
                    postId: postId,
                    type: 'edit',
                    createdAt: new Date().toISOString()
                });
            }

            await loadPosts(); // Refresh the posts
        } catch (error) {
            console.error('Error editing reply:', error);
        }
    };

    /**
     * Delete a reply.
     * @param {number} postId - The ID of the post containing the reply.
     * @param {number} replyId - The ID of the reply to delete.
     */
    window.deleteReply = async function(postId, replyId) {
        if (!confirm('Are you sure you want to delete this reply?')) return;
        
        const forumId = new URLSearchParams(window.location.search).get('id');
        try {
            // Get post and reply information before deletion
            const posts = JSON.parse(localStorage.getItem(`forum_posts_${forumId}`) || '[]');
            const parentPost = posts.find(p => p.id === postId);
            const subscriptions = JSON.parse(localStorage.getItem('threadSubscriptions') || '[]');

            await api.deleteReply(forumId, postId, replyId);

            // Notify subscribers about the deletion
            if (subscriptions.includes(postId) && parentPost) {
                notifications.add({
                    id: Date.now(),
                    message: `A reply in "${parentPost.title}" has been deleted`,
                    type: 'delete',
                    createdAt: new Date().toISOString()
                });
            }

            await loadPosts(); // Refresh the posts
        } catch (error) {
            console.error('Error deleting reply:', error);
        }
    };

    // Add toast container to the DOM
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);

    loadForumContent();
    loadPosts();
    postForm.addEventListener('submit', submitPost);

    // Add this to your existing event listeners
    document.getElementById('sort-select')?.addEventListener('change', () => {
        currentPage = 1; // Reset to first page when sorting changes
        loadPosts();
    });

    /**
     * Change the current page.
     * @param {number} newPage - The new page number to change to.
     */
    window.changePage = function(newPage) {
        currentPage = newPage;
        loadPosts();
        // Scroll to top of posts container
        postsContainer.scrollIntoView({ behavior: 'smooth' });
    };
});

module.exports = { api, notifications };