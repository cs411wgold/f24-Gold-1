const { api, notifications } = require('../forums/forums.js');

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn(key => store[key]),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        clear: jest.fn(() => {
            store = {};
        })
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

// Mock DOM elements
document.body.innerHTML = `
    <div id="forum-content"></div>
    <div id="posts-container"></div>
    <div id="toast-container"></div>
`;

describe('Forum API Tests', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    describe('getForumInfo', () => {
        it('should return forum information for valid forum ID', async () => {
            const forumInfo = await api.getForumInfo('math');
            expect(forumInfo).toEqual({
                title: 'Math Forum',
                description: 'Discuss all things related to mathematics!',
                icon: 'fa-calculator'
            });
        });

        it('should return undefined for invalid forum ID', async () => {
            const forumInfo = await api.getForumInfo('invalid');
            expect(forumInfo).toBeUndefined();
        });
    });

    describe('getPosts', () => {
        it('should return stored posts if they exist', async () => {
            const mockPosts = [{ id: 1, title: 'Test Post' }];
            localStorage.setItem('forum_posts_math', JSON.stringify(mockPosts));
            
            const posts = await api.getPosts('math');
            expect(posts).toEqual(mockPosts);
        });

        it('should return default posts if no stored posts exist', async () => {
            const posts = await api.getPosts('math');
            expect(Array.isArray(posts)).toBe(true);
            expect(posts.length).toBeGreaterThan(0);
            expect(posts[0]).toHaveProperty('title');
            expect(posts[0]).toHaveProperty('content');
        });
    });

    describe('createPost', () => {
        it('should create a new post and store it', async () => {
            const postData = {
                title: 'New Post',
                content: 'Test content'
            };

            const newPost = await api.createPost('math', postData);
            expect(newPost).toMatchObject({
                title: 'New Post',
                content: 'Test content',
                author: 'jimbo',
                upvotes: 0,
                downvotes: 0,
                replies: []
            });

            // Verify post was stored
            const storedPosts = JSON.parse(localStorage.getItem('forum_posts_math'));
            expect(storedPosts[0]).toMatchObject(postData);
        });
    });

    describe('createReply', () => {
        it('should create a reply to a post', async () => {
            // Setup initial post
            const initialPost = {
                id: 1,
                title: 'Test Post',
                content: 'Test content',
                replies: []
            };
            localStorage.setItem('forum_posts_math', JSON.stringify([initialPost]));

            // Mock window.location
            Object.defineProperty(window, 'location', {
                value: { search: '?id=math' }
            });

            const replyData = {
                content: 'Test reply'
            };

            const newReply = await api.createReply(1, replyData);
            expect(newReply).toMatchObject({
                content: 'Test reply',
                author: 'jimbo',
                upvotes: 0,
                downvotes: 0
            });

            // Verify reply was stored
            const storedPosts = JSON.parse(localStorage.getItem('forum_posts_math'));
            expect(storedPosts[0].replies[0]).toMatchObject({
                content: 'Test reply'
            });
        });
    });

    describe('vote functions', () => {
        it('should handle post voting', async () => {
            const result = await api.vote(1, 1);
            expect(result).toEqual({ success: true });
        });

        it('should handle reply voting', async () => {
            const result = await api.voteReply(1, 1);
            expect(result).toEqual({ success: true });
        });
    });

    describe('subscription functions', () => {
        it('should handle thread subscription', async () => {
            const result = await api.subscribeToThread(1);
            expect(result).toEqual({ success: true, subscribed: true });
        });

        it('should handle thread unsubscription', async () => {
            const result = await api.unsubscribeFromThread(1);
            expect(result).toEqual({ success: true, subscribed: false });
        });

        it('should get subscription status', async () => {
            localStorage.setItem('subscribed_1', 'true');
            const result = await api.getSubscriptionStatus(1);
            expect(result).toEqual({ subscribed: true });
        });
    });

    describe('edit functions', () => {
        beforeEach(() => {
            localStorage.setItem('forum_posts_math', JSON.stringify([{
                id: 1,
                title: 'Test Post',
                content: 'Original content',
                replies: [{
                    id: 2,
                    content: 'Original reply'
                }]
            }]));
        });

        it('should edit a post', async () => {
            await api.editPost('math', 1, 'Updated content');
            const posts = JSON.parse(localStorage.getItem('forum_posts_math'));
            expect(posts[0].content).toBe('Updated content');
            expect(posts[0].edited).toBe(true);
            expect(posts[0].editedAt).toBeDefined();
        });

        it('should edit a reply', async () => {
            await api.editReply('math', 1, 2, 'Updated reply');
            const posts = JSON.parse(localStorage.getItem('forum_posts_math'));
            expect(posts[0].replies[0].content).toBe('Updated reply');
            expect(posts[0].replies[0].edited).toBe(true);
            expect(posts[0].replies[0].editedAt).toBeDefined();
        });
    });

    describe('delete functions', () => {
        beforeEach(() => {
            localStorage.setItem('forum_posts_math', JSON.stringify([{
                id: 1,
                title: 'Test Post',
                content: 'Test content',
                replies: [{
                    id: 2,
                    content: 'Test reply'
                }]
            }]));
        });

        it('should delete a post', async () => {
            await api.deletePost('math', 1);
            const posts = JSON.parse(localStorage.getItem('forum_posts_math'));
            expect(posts).toHaveLength(0);
        });

        it('should delete a reply', async () => {
            await api.deleteReply('math', 1, 2);
            const posts = JSON.parse(localStorage.getItem('forum_posts_math'));
            expect(posts[0].replies).toHaveLength(0);
        });
    });

    describe('notifications', () => {
        it('should add a notification', () => {
            const notification = {
                id: 1,
                message: 'Test notification',
                postId: 1,
                createdAt: new Date().toISOString()
            };

            notifications.add(notification);
            const storedNotifications = JSON.parse(localStorage.getItem('notifications'));
            expect(storedNotifications[0]).toMatchObject(notification);
        });
    });
});
