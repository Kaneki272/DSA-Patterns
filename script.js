        const PATTERNS = [
            {
                id: 0, icon: "👯", title: "Two Pointers", tagline: "Two fingers walking toward each other",
                difficulty: "easy", color: "#6c63ff",
                lcLink: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
                intuition: `<strong>Hey, think of it like this:</strong> You have a sorted array and you're hunting for two numbers that sum to a target. The dumb way: check every pair — O(n²). The smart way: put one finger at the left end, one at the right. If the sum's too big, slide the right finger left. Too small? Slide the left finger right. You're <em>squeezing toward the answer</em> — and it's O(n).`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Sorted array</strong> + find pair/triplet with sum condition" },
                        { icon: "✅", text: "<strong>Palindrome check</strong> — compare from both ends" },
                        { icon: "✅", text: "<strong>Remove duplicates</strong> in-place from sorted array" },
                        { icon: "✅", text: "<strong>Container with most water</strong> — maximize area" },
                    ],
                    avoid: [
                        { icon: "❌", text: "<strong>Unsorted array</strong> where sorting isn't allowed" },
                        { icon: "❌", text: "Need <strong>all combinations</strong> not just one pair → use backtracking" },
                    ],
                    signals: ["sorted array", "two numbers", "palindrome", "in-place removal", "squeeze", "from both ends"],
                    notSignals: ["all subsets", "tree/graph", "frequency count"],
                    howToDistinguish: `Ask: "Is it sorted + am I looking for a pair?" If yes → Two Pointers. If unsorted and you need ALL pairs → HashMap (Two Sum classic). If you need contiguous chunks → Sliding Window.`
                },
                viz: "twopointers",
                code: `<span class="cm"># Two Sum II — sorted array</span>
<span class="kw">def</span> <span class="fn">two_sum</span>(numbers, target):
    left, right = <span class="nm">0</span>, <span class="kw">len</span>(numbers) - <span class="nm">1</span>
    <span class="kw">while</span> left < right:
        s = numbers[left] + numbers[right]
        <span class="kw">if</span> s == target:   <span class="kw">return</span> [left+<span class="nm">1</span>, right+<span class="nm">1</span>]
        <span class="kw">elif</span> s < target:  left += <span class="nm">1</span>
        <span class="kw">else</span>:             right -= <span class="nm">1</span>

<span class="cm"># Valid Palindrome</span>
<span class="kw">def</span> <span class="fn">is_palindrome</span>(s):
    s = [c <span class="kw">for</span> c <span class="kw">in</span> s.lower() <span class="kw">if</span> c.isalnum()]
    l, r = <span class="nm">0</span>, <span class="kw">len</span>(s)-<span class="nm">1</span>
    <span class="kw">while</span> l < r:
        <span class="kw">if</span> s[l] != s[r]: <span class="kw">return</span> <span class="kw">False</span>
        l += <span class="nm">1</span>; r -= <span class="nm">1</span>
    <span class="kw">return</span> <span class="kw">True</span>`,
                tc: "O(n)", sc: "O(1)",
                tip: "If array isn't sorted, sort it first (O(n log n) still beats O(n²)). The squeeze metaphor works because sorting gives monotonic control over the sum.",
                problems: [
                    { name: "Two Sum II", diff: "easy", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", tag: "sorted" },
                    { name: "Valid Palindrome", diff: "easy", url: "https://leetcode.com/problems/valid-palindrome/", tag: "string" },
                    { name: "3Sum", diff: "medium", url: "https://leetcode.com/problems/3sum/", tag: "sorted" },
                    { name: "Container With Most Water", diff: "medium", url: "https://leetcode.com/problems/container-with-most-water/", tag: "squeeze" },
                    { name: "Trapping Rain Water", diff: "hard", url: "https://leetcode.com/problems/trapping-rain-water/", tag: "classic" },
                ]
            },
            {
                id: 1, icon: "🪟", title: "Sliding Window", tagline: "A moving frame over a sequence",
                difficulty: "easy", color: "#00d48a",
                lcLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
                intuition: `<strong>Imagine a train window.</strong> You're watching houses pass. You keep track of k houses at a time. Train moves forward → front edge gains one, back edge loses one. You never restart the count — you <em>slide forward</em>. Two flavors: <b>fixed size</b> (exactly k elements) and <b>variable size</b> (grow until condition breaks, then shrink from left).`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Subarray/substring of exactly k size</strong>" },
                        { icon: "✅", text: "<strong>Longest/shortest subarray</strong> satisfying some property" },
                        { icon: "✅", text: "<strong>Contiguous</strong> elements are key" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Non-contiguous elements — use DP or backtracking" },
                        { icon: "❌", text: "Need index from anywhere in array — use HashMap/binary search" },
                    ],
                    signals: ["substring", "subarray", "contiguous", "window", "k elements", "longest without", "minimum covering"],
                    notSignals: ["subsequence (non-contiguous)", "all combinations", "tree"],
                    howToDistinguish: `The magic word is <em>contiguous</em>. If you need elements in a row (not skipping), reach for sliding window. Fixed size → easier (subtract left, add right). Variable size → expand right until violated, shrink left until valid again.`
                },
                viz: "slidingwindow",
                code: `<span class="cm"># Fixed: max sum subarray size k</span>
<span class="kw">def</span> <span class="fn">max_sum</span>(nums, k):
    win = <span class="kw">sum</span>(nums[:k]); best = win
    <span class="kw">for</span> i <span class="kw">in</span> <span class="kw">range</span>(k, <span class="kw">len</span>(nums)):
        win += nums[i] - nums[i-k]
        best = <span class="kw">max</span>(best, win)
    <span class="kw">return</span> best

<span class="cm"># Variable: longest no-repeat substring</span>
<span class="kw">def</span> <span class="fn">length_of_longest</span>(s):
    seen = {}; left = best = <span class="nm">0</span>
    <span class="kw">for</span> right, c <span class="kw">in</span> <span class="kw">enumerate</span>(s):
        <span class="kw">if</span> c <span class="kw">in</span> seen <span class="kw">and</span> seen[c] >= left:
            left = seen[c] + <span class="nm">1</span>
        seen[c] = right
        best = <span class="kw">max</span>(best, right - left + <span class="nm">1</span>)
    <span class="kw">return</span> best`,
                tc: "O(n)", sc: "O(k) or O(charset)",
                tip: "Variable window: expand right freely, only shrink left when constraint violated. The two-pointer pair (left, right) both only move forward — that's why it's O(n).",
                problems: [
                    { name: "Longest Substring Without Repeating", diff: "medium", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", tag: "variable" },
                    { name: "Maximum Average Subarray I", diff: "easy", url: "https://leetcode.com/problems/maximum-average-subarray-i/", tag: "fixed" },
                    { name: "Minimum Window Substring", diff: "hard", url: "https://leetcode.com/problems/minimum-window-substring/", tag: "variable" },
                    { name: "Fruit Into Baskets", diff: "medium", url: "https://leetcode.com/problems/fruit-into-baskets/", tag: "at most k" },
                    { name: "Permutation in String", diff: "medium", url: "https://leetcode.com/problems/permutation-in-string/", tag: "fixed" },
                ]
            },
            {
                id: 2, icon: "➕", title: "Prefix Sum", tagline: "Pre-compute to answer range queries instantly",
                difficulty: "easy", color: "#f5c842",
                lcLink: "https://leetcode.com/problems/range-sum-query-immutable/",
                intuition: `<strong>Receipt analogy:</strong> Long receipt with running totals pre-calculated. Someone asks "total between item 3 and 7?" — you don't re-add. You just do total[7] - total[2]. That's prefix sum. Precompute once in O(n), then every range query is O(1). The <em>subarray sum = k</em> trick with HashMap is a FAANG classic.`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "Multiple <strong>range sum queries</strong> on same array" },
                        { icon: "✅", text: "<strong>Subarray sum equals k</strong> — count subarrays" },
                        { icon: "✅", text: "<strong>Find pivot</strong> where left sum == right sum" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Array is <strong>mutable</strong> — use Fenwick tree instead" },
                        { icon: "❌", text: "You only need ONE range sum — just loop, no prefix needed" },
                    ],
                    signals: ["sum between i and j", "subarray sum equals", "count subarrays", "pivot index", "running total"],
                    notSignals: ["dynamic updates", "graph", "sorting"],
                    howToDistinguish: `If you see "sum from L to R" asked repeatedly → prefix. If you see "count subarrays with sum = k" → prefix + HashMap (the complement trick: if prefix[j] - prefix[i] = k, then seen[prefix-k] gives count).`
                },
                viz: "prefixsum",
                code: `<span class="cm"># Range Sum Query</span>
<span class="kw">class</span> <span class="tp">NumArray</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, nums):
        self.pre = [<span class="nm">0</span>] * (<span class="kw">len</span>(nums)+<span class="nm">1</span>)
        <span class="kw">for</span> i,v <span class="kw">in</span> <span class="kw">enumerate</span>(nums):
            self.pre[i+<span class="nm">1</span>] = self.pre[i] + v
    <span class="kw">def</span> <span class="fn">sum_range</span>(self, l, r):
        <span class="kw">return</span> self.pre[r+<span class="nm">1</span>] - self.pre[l]

<span class="cm"># Subarray Sum Equals K</span>
<span class="kw">def</span> <span class="fn">subarray_sum</span>(nums, k):
    <span class="kw">from</span> collections <span class="kw">import</span> defaultdict
    seen = defaultdict(int); seen[<span class="nm">0</span>] = <span class="nm">1</span>
    prefix = count = <span class="nm">0</span>
    <span class="kw">for</span> n <span class="kw">in</span> nums:
        prefix += n
        count += seen[prefix - k]
        seen[prefix] += <span class="nm">1</span>
    <span class="kw">return</span> count`,
                tc: "O(n) build, O(1) query", sc: "O(n)",
                tip: "The subarray sum=k trick: if prefix[j]-prefix[i]=k, then seen[prefix-k] counts valid starting points. Always initialize seen[0]=1 for subarrays starting from index 0.",
                problems: [
                    { name: "Range Sum Query - Immutable", diff: "easy", url: "https://leetcode.com/problems/range-sum-query-immutable/", tag: "classic" },
                    { name: "Subarray Sum Equals K", diff: "medium", url: "https://leetcode.com/problems/subarray-sum-equals-k/", tag: "HashMap combo" },
                    { name: "Find Pivot Index", diff: "easy", url: "https://leetcode.com/problems/find-pivot-index/", tag: "balance" },
                    { name: "Product of Array Except Self", diff: "medium", url: "https://leetcode.com/problems/product-of-array-except-self/", tag: "prefix+suffix" },
                    { name: "Continuous Subarray Sum", diff: "medium", url: "https://leetcode.com/problems/continuous-subarray-sum/", tag: "modulo trick" },
                ]
            },
            {
                id: 3, icon: "🗺️", title: "HashMap / HashSet", tagline: "Trade memory for instant lookups",
                difficulty: "easy", color: "#ff7b4b",
                lcLink: "https://leetcode.com/problems/two-sum/",
                intuition: `<strong>Party analogy:</strong> You want to know if your friend is at a party. Option A: walk around asking everyone — O(n). Option B: check the guest list book — O(1). A HashMap is that list. The <em>complement trick</em>: instead of checking every pair for two sum, for each number store it and check if target-number was already seen. One pass!`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Have I seen this before?</strong> — duplicates, frequency" },
                        { icon: "✅", text: "<strong>Complement lookup</strong> — two sum style" },
                        { icon: "✅", text: "<strong>Grouping</strong> — anagrams, equal elements" },
                        { icon: "✅", text: "<strong>O(1) membership check</strong> replacing O(n) search" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Need <strong>sorted order</strong> — use TreeMap/sorted array" },
                        { icon: "❌", text: "Need <strong>range queries</strong> — use prefix sum or segment tree" },
                    ],
                    signals: ["two sum", "duplicates", "frequency", "count occurrences", "group by", "seen before", "anagram"],
                    notSignals: ["sorted range", "nearest element", "graph traversal"],
                    howToDistinguish: `Whenever you find yourself writing a nested loop to compare elements, ask: "Can I store what I've seen so far in a map?" 9/10 times yes. The complement trick (target - current → look up) eliminates the inner loop.`
                },
                viz: "hashmap",
                code: `<span class="cm"># Classic Two Sum</span>
<span class="kw">def</span> <span class="fn">two_sum</span>(nums, target):
    seen = {}
    <span class="kw">for</span> i, n <span class="kw">in</span> <span class="kw">enumerate</span>(nums):
        comp = target - n
        <span class="kw">if</span> comp <span class="kw">in</span> seen: <span class="kw">return</span> [seen[comp], i]
        seen[n] = i

<span class="cm"># Group Anagrams</span>
<span class="kw">def</span> <span class="fn">group_anagrams</span>(strs):
    <span class="kw">from</span> collections <span class="kw">import</span> defaultdict
    d = defaultdict(list)
    <span class="kw">for</span> s <span class="kw">in</span> strs:
        d[<span class="kw">tuple</span>(<span class="kw">sorted</span>(s))].append(s)
    <span class="kw">return</span> <span class="kw">list</span>(d.values())

<span class="cm"># Longest Consecutive (O(n) using set)</span>
<span class="kw">def</span> <span class="fn">longest_consecutive</span>(nums):
    s = <span class="kw">set</span>(nums); best = <span class="nm">0</span>
    <span class="kw">for</span> n <span class="kw">in</span> s:
        <span class="kw">if</span> n-<span class="nm">1</span> <span class="kw">not in</span> s:  <span class="cm"># sequence start</span>
            length = <span class="nm">1</span>
            <span class="kw">while</span> n+length <span class="kw">in</span> s: length += <span class="nm">1</span>
            best = <span class="kw">max</span>(best, length)
    <span class="kw">return</span> best`,
                tc: "O(n)", sc: "O(n)",
                tip: "O(n²) brute force with nested search → HashMap fix. Complement trick: instead of 'for each pair', store and look up. For consecutive: only start sequences from the leftmost number (n-1 not in set).",
                problems: [
                    { name: "Two Sum", diff: "easy", url: "https://leetcode.com/problems/two-sum/", tag: "classic" },
                    { name: "Valid Anagram", diff: "easy", url: "https://leetcode.com/problems/valid-anagram/", tag: "frequency" },
                    { name: "Group Anagrams", diff: "medium", url: "https://leetcode.com/problems/group-anagrams/", tag: "grouping" },
                    { name: "Top K Frequent Elements", diff: "medium", url: "https://leetcode.com/problems/top-k-frequent-elements/", tag: "count" },
                    { name: "Longest Consecutive Sequence", diff: "medium", url: "https://leetcode.com/problems/longest-consecutive-sequence/", tag: "set trick" },
                ]
            },
            {
                id: 4, icon: "📚", title: "Stack", tagline: "Last In First Out — handles nesting & history",
                difficulty: "easy", color: "#f03e84",
                lcLink: "https://leetcode.com/problems/valid-parentheses/",
                intuition: `<strong>Browser back button:</strong> Every URL you visit gets pushed. Hit back? Pop the last one. Stacks are perfect for anything involving <em>nesting</em> (brackets match innermost first) or <em>history</em> (undo operations). The Monotonic Stack sub-pattern — maintaining a stack that's always increasing or decreasing — solves "next greater element" family in O(n).`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Matching brackets/parentheses</strong> — innermost first" },
                        { icon: "✅", text: "<strong>Next greater/smaller element</strong> — monotonic stack" },
                        { icon: "✅", text: "<strong>Undo operations</strong>, expression evaluation" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Shortest path → use BFS (queue not stack)" },
                        { icon: "❌", text: "Need random access to any element" },
                    ],
                    signals: ["valid parentheses", "next greater", "daily temperatures", "evaluate expression", "decode string", "asteroid collision"],
                    notSignals: ["shortest path", "k closest", "sorted order"],
                    howToDistinguish: `Stack = last thing seen is most relevant. If a problem cares about matching/nesting or "what was the last X I encountered", it's a stack. Monotonic stack: if you need NGE/NSE for all elements at once in O(n) vs O(n²) brute force.`
                },
                viz: "stack",
                code: `<span class="cm"># Valid Parentheses</span>
<span class="kw">def</span> <span class="fn">is_valid</span>(s):
    stack = []
    pairs = {<span class="st">')'</span>:<span class="st">'('</span>, <span class="st">']'</span>:<span class="st">'['</span>, <span class="st">'}'</span>:<span class="st">'{'</span>}
    <span class="kw">for</span> c <span class="kw">in</span> s:
        <span class="kw">if</span> c <span class="kw">in</span> <span class="st">"([{"</span>: stack.append(c)
        <span class="kw">elif not</span> stack <span class="kw">or</span> stack[-<span class="nm">1</span>] != pairs[c]: <span class="kw">return False</span>
        <span class="kw">else</span>: stack.pop()
    <span class="kw">return not</span> stack

<span class="cm"># Next Greater Element (Monotonic Stack)</span>
<span class="kw">def</span> <span class="fn">next_greater</span>(nums):
    res = [-<span class="nm">1</span>] * <span class="kw">len</span>(nums); stack = []
    <span class="kw">for</span> i, n <span class="kw">in</span> <span class="kw">enumerate</span>(nums):
        <span class="kw">while</span> stack <span class="kw">and</span> nums[stack[-<span class="nm">1</span>]] < n:
            res[stack.pop()] = n  <span class="cm"># n is their NGE</span>
        stack.append(i)
    <span class="kw">return</span> res`,
                tc: "O(n)", sc: "O(n)",
                tip: "Monotonic stack trick: for each element, pop everything it's 'greater than' — those elements just found their NGE. Elements remaining in stack have no NGE (return -1). Each element pushed/popped once → O(n) total.",
                problems: [
                    { name: "Valid Parentheses", diff: "easy", url: "https://leetcode.com/problems/valid-parentheses/", tag: "matching" },
                    { name: "Min Stack", diff: "medium", url: "https://leetcode.com/problems/min-stack/", tag: "design" },
                    { name: "Daily Temperatures", diff: "medium", url: "https://leetcode.com/problems/daily-temperatures/", tag: "monotonic" },
                    { name: "Largest Rectangle in Histogram", diff: "hard", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/", tag: "monotonic" },
                    { name: "Decode String", diff: "medium", url: "https://leetcode.com/problems/decode-string/", tag: "nesting" },
                ]
            },
            {
                id: 5, icon: "🌊", title: "BFS", tagline: "Level-by-level exploration with a Queue",
                difficulty: "medium", color: "#6c63ff",
                lcLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
                intuition: `<strong>Ripples in a pond:</strong> Drop a stone — ripples spread outward level by level. BFS works exactly like that using a Queue (FIFO). Process all level-1 neighbors before level-2. This guarantees <em>shortest path</em> in unweighted graphs. Key: use a deque, mark visited when you ADD to queue (not when you process).`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Shortest path</strong> in unweighted graph/grid" },
                        { icon: "✅", text: "<strong>Level-order traversal</strong> of trees" },
                        { icon: "✅", text: "<strong>Minimum steps</strong> to reach target" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Need to explore ALL paths → use DFS/backtracking" },
                        { icon: "❌", text: "Weighted shortest path → Dijkstra" },
                    ],
                    signals: ["shortest path", "minimum steps", "level order", "rotting oranges", "word ladder", "01 matrix"],
                    notSignals: ["all paths", "weighted graph", "detect cycle"],
                    howToDistinguish: `BFS vs DFS: use BFS when the answer is "how few steps". Use DFS when the answer is "does a path exist" or "find all paths". BFS guarantees minimum — DFS doesn't.`
                },
                viz: "bfs",
                code: `<span class="kw">from</span> collections <span class="kw">import</span> deque

<span class="cm"># Level Order Traversal</span>
<span class="kw">def</span> <span class="fn">level_order</span>(root):
    <span class="kw">if not</span> root: <span class="kw">return</span> []
    q, res = deque([root]), []
    <span class="kw">while</span> q:
        level = []
        <span class="kw">for</span> _ <span class="kw">in</span> <span class="kw">range</span>(<span class="kw">len</span>(q)):
            node = q.popleft()
            level.append(node.val)
            <span class="kw">if</span> node.left: q.append(node.left)
            <span class="kw">if</span> node.right: q.append(node.right)
        res.append(level)
    <span class="kw">return</span> res

<span class="cm"># Shortest Path in Grid</span>
<span class="kw">def</span> <span class="fn">shortest_path</span>(grid):
    n = <span class="kw">len</span>(grid)
    q = deque([(<span class="nm">0</span>,<span class="nm">0</span>,<span class="nm">1</span>)]); grid[<span class="nm">0</span>][<span class="nm">0</span>] = <span class="nm">1</span>
    dirs = [(-<span class="nm">1</span>,-<span class="nm">1</span>),(-<span class="nm">1</span>,<span class="nm">0</span>),(-<span class="nm">1</span>,<span class="nm">1</span>),(0,-<span class="nm">1</span>),(0,<span class="nm">1</span>),(1,-<span class="nm">1</span>),(1,0),(1,1)]
    <span class="kw">while</span> q:
        r,c,d = q.popleft()
        <span class="kw">if</span> r==c==n-<span class="nm">1</span>: <span class="kw">return</span> d
        <span class="kw">for</span> dr,dc <span class="kw">in</span> dirs:
            nr,nc = r+dr, c+dc
            <span class="kw">if</span> <span class="nm">0</span><=nr<n <span class="kw">and</span> <span class="nm">0</span><=nc<n <span class="kw">and not</span> grid[nr][nc]:
                grid[nr][nc]=<span class="nm">1</span>; q.append((nr,nc,d+<span class="nm">1</span>))
    <span class="kw">return</span> -<span class="nm">1</span>`,
                tc: "O(V+E)", sc: "O(V)",
                tip: "Mark nodes visited when ADDING to queue, not when processing. Otherwise duplicates flood the queue. The inner for-loop 'for _ in range(len(q))' processes exactly one level.",
                problems: [
                    { name: "Binary Tree Level Order Traversal", diff: "medium", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", tag: "tree" },
                    { name: "Rotting Oranges", diff: "medium", url: "https://leetcode.com/problems/rotting-oranges/", tag: "multi-source" },
                    { name: "Word Ladder", diff: "hard", url: "https://leetcode.com/problems/word-ladder/", tag: "classic" },
                    { name: "01 Matrix", diff: "medium", url: "https://leetcode.com/problems/01-matrix/", tag: "grid" },
                    { name: "Shortest Path in Binary Matrix", diff: "medium", url: "https://leetcode.com/problems/shortest-path-in-binary-matrix/", tag: "grid" },
                ]
            },
            {
                id: 6, icon: "🕳️", title: "DFS", tagline: "Go deep first, backtrack when stuck",
                difficulty: "medium", color: "#00d48a",
                lcLink: "https://leetcode.com/problems/number-of-islands/",
                intuition: `<strong>Maze explorer:</strong> Always walk as deep as possible down one corridor. Hit a dead end? Retrace steps and try another direction. Recursion naturally models this (the call stack IS the DFS stack). DFS explores ALL reachable nodes and is perfect for finding connected components, islands, or any "flood fill" type problem.`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Connected components</strong>, island counting" },
                        { icon: "✅", text: "<strong>All paths</strong> from source to dest" },
                        { icon: "✅", text: "<strong>Cycle detection</strong> in directed graphs" },
                        { icon: "✅", text: "Tree problems: height, path sums, diameter" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Need <strong>shortest path</strong> → BFS" },
                        { icon: "❌", text: "Large graphs with risk of <strong>stack overflow</strong> → iterative BFS" },
                    ],
                    signals: ["number of islands", "path exists", "connected", "flood fill", "tree height", "all paths", "cycle"],
                    notSignals: ["shortest/minimum steps", "level by level", "priority"],
                    howToDistinguish: `BFS = shortest path. DFS = explore all / existence / components. For island/component counting either works, DFS is cleaner. For tree problems, DFS (recursion) is almost always the answer.`
                },
                viz: "dfs",
                code: `<span class="cm"># Number of Islands</span>
<span class="kw">def</span> <span class="fn">num_islands</span>(grid):
    <span class="kw">def</span> <span class="fn">dfs</span>(r, c):
        <span class="kw">if</span> r < <span class="nm">0</span> <span class="kw">or</span> r >= <span class="kw">len</span>(grid) <span class="kw">or</span> \
           c < <span class="nm">0</span> <span class="kw">or</span> c >= <span class="kw">len</span>(grid[<span class="nm">0</span>]) <span class="kw">or</span> \
           grid[r][c] != <span class="st">'1'</span>: <span class="kw">return</span>
        grid[r][c] = <span class="st">'0'</span>  <span class="cm"># sink it</span>
        dfs(r+<span class="nm">1</span>,c); dfs(r-<span class="nm">1</span>,c)
        dfs(r,c+<span class="nm">1</span>); dfs(r,c-<span class="nm">1</span>)
    count = <span class="nm">0</span>
    <span class="kw">for</span> r <span class="kw">in</span> <span class="kw">range</span>(<span class="kw">len</span>(grid)):
        <span class="kw">for</span> c <span class="kw">in</span> <span class="kw">range</span>(<span class="kw">len</span>(grid[<span class="nm">0</span>])):
            <span class="kw">if</span> grid[r][c] == <span class="st">'1'</span>:
                dfs(r, c); count += <span class="nm">1</span>
    <span class="kw">return</span> count`,
                tc: "O(V+E)", sc: "O(V)",
                tip: "For grids: dfs 4 directions. Mark cells visited by changing value (sink the island). No need for a visited set! For tree DFS, recursion is clean; for graph DFS with large input, go iterative to avoid recursion limit.",
                problems: [
                    { name: "Number of Islands", diff: "medium", url: "https://leetcode.com/problems/number-of-islands/", tag: "classic" },
                    { name: "Max Area of Island", diff: "medium", url: "https://leetcode.com/problems/max-area-of-island/", tag: "grid" },
                    { name: "Clone Graph", diff: "medium", url: "https://leetcode.com/problems/clone-graph/", tag: "graph" },
                    { name: "Path Sum", diff: "easy", url: "https://leetcode.com/problems/path-sum/", tag: "tree" },
                    { name: "Course Schedule (cycle)", diff: "medium", url: "https://leetcode.com/problems/course-schedule/", tag: "cycle detect" },
                ]
            },
            {
                id: 7, icon: "🔙", title: "Backtracking", tagline: "Try all choices, undo bad ones",
                difficulty: "medium", color: "#f5c842",
                lcLink: "https://leetcode.com/problems/subsets/",
                intuition: `<strong>Jigsaw puzzle approach:</strong> Try placing a piece. Fits? Great, continue. Doesn't fit? Take it back (backtrack) and try the next piece. Template is always: <em>choose → recurse → unchoose</em>. The power is in pruning — if you know a branch can't work, skip it early. This is how Sudoku solvers and N-Queens work.`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Generate ALL</strong> subsets/permutations/combinations" },
                        { icon: "✅", text: "<strong>Constraint satisfaction</strong> — Sudoku, N-Queens" },
                        { icon: "✅", text: "Word search in a grid" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Only need <strong>COUNT</strong> of solutions → often DP is faster" },
                        { icon: "❌", text: "Need <strong>optimal</strong> solution → DP (backtracking explores all)" },
                    ],
                    signals: ["generate all", "all subsets", "all permutations", "combination sum", "word search", "n-queens", "sudoku"],
                    notSignals: ["count ways (→DP)", "shortest path", "maximum/minimum value"],
                    howToDistinguish: `Backtracking vs DP: Backtracking = enumerate all possibilities. DP = count/optimize. If problem says "find/return ALL solutions" → backtracking. If it says "count solutions" or "minimum cost" → DP. Both use recursion but DP caches, backtracking undoes.`
                },
                viz: "backtracking",
                code: `<span class="cm"># Subsets (all 2^n)</span>
<span class="kw">def</span> <span class="fn">subsets</span>(nums):
    res = []
    <span class="kw">def</span> <span class="fn">bt</span>(start, cur):
        res.append(cur[:])
        <span class="kw">for</span> i <span class="kw">in</span> <span class="kw">range</span>(start, <span class="kw">len</span>(nums)):
            cur.append(nums[i])   <span class="cm"># choose</span>
            bt(i+<span class="nm">1</span>, cur)         <span class="cm"># explore</span>
            cur.pop()             <span class="cm"># unchoose ←</span>
    bt(<span class="nm">0</span>, []); <span class="kw">return</span> res

<span class="cm"># Combination Sum (with reuse)</span>
<span class="kw">def</span> <span class="fn">combination_sum</span>(candidates, target):
    res = []
    <span class="kw">def</span> <span class="fn">bt</span>(start, cur, rem):
        <span class="kw">if</span> rem == <span class="nm">0</span>: res.append(cur[:]); <span class="kw">return</span>
        <span class="kw">for</span> i <span class="kw">in</span> <span class="kw">range</span>(start, <span class="kw">len</span>(candidates)):
            <span class="kw">if</span> candidates[i] > rem: <span class="kw">break</span>  <span class="cm"># prune!</span>
            cur.append(candidates[i])
            bt(i, cur, rem-candidates[i])
            cur.pop()
    candidates.sort(); bt(<span class="nm">0</span>, [], target); <span class="kw">return</span> res`,
                tc: "O(2^n) or O(n!)", sc: "O(n)",
                tip: "Always sort + pass 'start' index to avoid duplicates in subsets/combinations. The 'if candidates[i] > rem: break' is a pruning optimization — cuts branches early. Prune aggressively to pass time limits.",
                problems: [
                    { name: "Subsets", diff: "medium", url: "https://leetcode.com/problems/subsets/", tag: "generate all" },
                    { name: "Permutations", diff: "medium", url: "https://leetcode.com/problems/permutations/", tag: "ordering" },
                    { name: "Combination Sum", diff: "medium", url: "https://leetcode.com/problems/combination-sum/", tag: "with reuse" },
                    { name: "Word Search", diff: "medium", url: "https://leetcode.com/problems/word-search/", tag: "grid" },
                    { name: "N-Queens", diff: "hard", url: "https://leetcode.com/problems/n-queens/", tag: "constraint" },
                ]
            },
            {
                id: 8, icon: "🎯", title: "Binary Search", tagline: "Halve your search space each step",
                difficulty: "medium", color: "#ff7b4b",
                lcLink: "https://leetcode.com/problems/binary-search/",
                intuition: `<strong>Guess my number 1-100:</strong> You say 50, I say "too high". You say 25, I say "too low"... Binary search is this game played on data. Every guess eliminates HALF the remaining options. The advanced pattern: "Binary Search on Answer" — when you ask "what's the minimum X such that some condition is true?" Binary search X itself!`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Sorted array</strong> — find target" },
                        { icon: "✅", text: "<strong>Monotonic condition</strong> — find boundary (first true)" },
                        { icon: "✅", text: "<strong>Minimize/maximize a value</strong> with a feasibility check" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Unsorted, no ordering → can't eliminate half" },
                        { icon: "❌", text: "Need all occurrences → linear scan" },
                    ],
                    signals: ["sorted array", "minimum speed", "maximum", "find boundary", "rotated", "first bad version", "capacity"],
                    notSignals: ["unsorted", "all occurrences", "graph"],
                    howToDistinguish: `Key insight: Is there a monotonic yes/no condition? (Once it's true, it stays true as X increases.) If yes → binary search on X. Classic: "Can I accomplish task with capacity X?" — binary search X from 1 to max.`
                },
                viz: "binarysearch",
                code: `<span class="cm"># Classic Binary Search</span>
<span class="kw">def</span> <span class="fn">search</span>(nums, target):
    l, r = <span class="nm">0</span>, <span class="kw">len</span>(nums)-<span class="nm">1</span>
    <span class="kw">while</span> l <= r:
        mid = l + (r-l)//<span class="nm">2</span>  <span class="cm"># avoids overflow</span>
        <span class="kw">if</span> nums[mid] == target: <span class="kw">return</span> mid
        <span class="kw">elif</span> nums[mid] < target: l = mid+<span class="nm">1</span>
        <span class="kw">else</span>: r = mid-<span class="nm">1</span>
    <span class="kw">return</span> -<span class="nm">1</span>

<span class="cm"># Binary Search on Answer (Koko)</span>
<span class="kw">def</span> <span class="fn">min_eating_speed</span>(piles, h):
    <span class="kw">import</span> math
    <span class="kw">def</span> <span class="fn">feasible</span>(k):
        <span class="kw">return</span> <span class="kw">sum</span>(math.ceil(p/k) <span class="kw">for</span> p <span class="kw">in</span> piles) <= h
    l, r = <span class="nm">1</span>, <span class="kw">max</span>(piles)
    <span class="kw">while</span> l < r:
        mid = (l+r)//<span class="nm">2</span>
        <span class="kw">if</span> feasible(mid): r = mid
        <span class="kw">else</span>: l = mid+<span class="nm">1</span>
    <span class="kw">return</span> l`,
                tc: "O(log n)", sc: "O(1)",
                tip: "Two templates: (1) classic: while l<=r, return mid on match. (2) boundary find: while l<r, answer is l at end. Binary search on answer: set l=min_possible, r=max_possible, write feasible(mid) function.",
                problems: [
                    { name: "Binary Search", diff: "easy", url: "https://leetcode.com/problems/binary-search/", tag: "classic" },
                    { name: "Find Minimum in Rotated Array", diff: "medium", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", tag: "rotated" },
                    { name: "Search in Rotated Array", diff: "medium", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", tag: "rotated" },
                    { name: "Koko Eating Bananas", diff: "medium", url: "https://leetcode.com/problems/koko-eating-bananas/", tag: "search on answer" },
                    { name: "Median of Two Sorted Arrays", diff: "hard", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/", tag: "advanced" },
                ]
            },
            {
                id: 9, icon: "⬆️", title: "Heap / Priority Queue", tagline: "Always grab the min or max in O(log n)",
                difficulty: "medium", color: "#f03e84",
                lcLink: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
                intuition: `<strong>Magic bag:</strong> You can always instantly grab the smallest item. Push is O(log n), getting min is O(1). The key use-case: whenever you see <em>"top K"</em>, <em>"K closest"</em>, or <em>"K most frequent"</em>, think heap. Maintain a heap of exactly size K — if a new item beats the worst in your heap, swap it in.`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Top K / K largest / K smallest</strong>" },
                        { icon: "✅", text: "<strong>Merge K sorted lists</strong>" },
                        { icon: "✅", text: "<strong>Median from stream</strong> (two heaps!)" },
                        { icon: "✅", text: "<strong>Scheduling</strong> — process smallest deadline first" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Need all elements sorted → just sort O(n log n)" },
                        { icon: "❌", text: "K = n → sorting is same complexity, simpler" },
                    ],
                    signals: ["k largest", "k smallest", "k closest", "k frequent", "merge k", "median stream", "task scheduler"],
                    notSignals: ["all sorted", "single pass min/max", "path finding"],
                    howToDistinguish: `If K is much smaller than N, heap beats sorting. "K most frequent" → count + min-heap of size K. "Median stream" → two heaps (max-heap for lower half, min-heap for upper half). Always ask: do I need to repeatedly access extremes?`
                },
                viz: "heap",
                code: `<span class="kw">import</span> heapq

<span class="cm"># Kth Largest Element</span>
<span class="kw">def</span> <span class="fn">find_kth_largest</span>(nums, k):
    heap = []
    <span class="kw">for</span> n <span class="kw">in</span> nums:
        heapq.heappush(heap, n)
        <span class="kw">if</span> <span class="kw">len</span>(heap) > k:
            heapq.heappop(heap)  <span class="cm"># remove smallest</span>
    <span class="kw">return</span> heap[<span class="nm">0</span>]  <span class="cm"># kth largest</span>

<span class="cm"># Median from Data Stream (two heaps)</span>
<span class="kw">class</span> <span class="tp">MedianFinder</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        self.lo = []  <span class="cm"># max-heap (negated)</span>
        self.hi = []  <span class="cm"># min-heap</span>
    <span class="kw">def</span> <span class="fn">add_num</span>(self, n):
        heapq.heappush(self.lo, -n)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        <span class="kw">if</span> <span class="kw">len</span>(self.hi) > <span class="kw">len</span>(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))
    <span class="kw">def</span> <span class="fn">find_median</span>(self):
        <span class="kw">if</span> <span class="kw">len</span>(self.lo) > <span class="kw">len</span>(self.hi): <span class="kw">return</span> -self.lo[<span class="nm">0</span>]
        <span class="kw">return</span> (-self.lo[<span class="nm">0</span>] + self.hi[<span class="nm">0</span>]) / <span class="nm">2</span>`,
                tc: "O(n log k)", sc: "O(k)",
                tip: "Python only has min-heap. For max-heap: push negative values. For K largest → use min-heap size K (counterintuitive but correct: pop the smallest to keep only K biggest). Median trick: lo is max-heap (lower half), hi is min-heap (upper half).",
                problems: [
                    { name: "Kth Largest Element", diff: "medium", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", tag: "classic" },
                    { name: "Top K Frequent Elements", diff: "medium", url: "https://leetcode.com/problems/top-k-frequent-elements/", tag: "count+heap" },
                    { name: "K Closest Points to Origin", diff: "medium", url: "https://leetcode.com/problems/k-closest-points-to-origin/", tag: "distance" },
                    { name: "Find Median from Data Stream", diff: "hard", url: "https://leetcode.com/problems/find-median-from-data-stream/", tag: "two heaps" },
                    { name: "Merge K Sorted Lists", diff: "hard", url: "https://leetcode.com/problems/merge-k-sorted-lists/", tag: "merge" },
                ]
            },
            {
                id: 10, icon: "🔢", title: "Dynamic Programming", tagline: "Cache overlapping subproblems for optimal results",
                difficulty: "hard", color: "#6c63ff",
                lcLink: "https://leetcode.com/problems/climbing-stairs/",
                intuition: `<strong>Fibonacci with memory:</strong> fib(5) = fib(4)+fib(3), fib(4)=fib(3)+fib(2)... without caching you'd compute fib(3) multiple times. DP caches it. Two signs: <em>overlapping subproblems</em> (same sub-call multiple times) + <em>optimal substructure</em> (optimal answer built from optimal sub-answers). Two approaches: top-down (memoization) or bottom-up (tabulation).`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Count ways</strong> to do something" },
                        { icon: "✅", text: "<strong>Max/min cost</strong> with decisions at each step" },
                        { icon: "✅", text: "<strong>Can you reach</strong> / is it possible" },
                        { icon: "✅", text: "<strong>Sequences</strong> — LCS, LIS, edit distance" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Need <strong>all solutions</strong> not just count/optimal → backtracking" },
                        { icon: "❌", text: "No overlapping subproblems → just recurse/greedy" },
                    ],
                    signals: ["minimum coins", "number of ways", "longest increasing", "edit distance", "can reach", "rob houses", "buy sell stock"],
                    notSignals: ["enumerate all", "graph shortest (→BFS)", "already greedy solvable"],
                    howToDistinguish: `DP recipe: (1) Can I define dp[i] as "answer for first i elements"? (2) Can dp[i] be computed from dp[i-1], dp[i-2] etc.? (3) Are subproblems reused? If 3/3 yes → DP. Start with memoized recursion, optimize to table later.`
                },
                viz: "dp",
                code: `<span class="cm"># Climbing Stairs (Fibonacci-style)</span>
<span class="kw">def</span> <span class="fn">climb_stairs</span>(n):
    a, b = <span class="nm">1</span>, <span class="nm">1</span>
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="kw">range</span>(n-<span class="nm">1</span>): a, b = b, a+b
    <span class="kw">return</span> b

<span class="cm"># Coin Change (min coins)</span>
<span class="kw">def</span> <span class="fn">coin_change</span>(coins, amount):
    dp = [float(<span class="st">'inf'</span>)] * (amount+<span class="nm">1</span>)
    dp[<span class="nm">0</span>] = <span class="nm">0</span>
    <span class="kw">for</span> a <span class="kw">in</span> <span class="kw">range</span>(<span class="nm">1</span>, amount+<span class="nm">1</span>):
        <span class="kw">for</span> c <span class="kw">in</span> coins:
            <span class="kw">if</span> c <= a: dp[a] = <span class="kw">min</span>(dp[a], dp[a-c]+<span class="nm">1</span>)
    <span class="kw">return</span> dp[amount] <span class="kw">if</span> dp[amount] != float(<span class="st">'inf'</span>) <span class="kw">else</span> -<span class="nm">1</span>

<span class="cm"># Longest Increasing Subsequence O(n log n)</span>
<span class="kw">import</span> bisect
<span class="kw">def</span> <span class="fn">length_of_LIS</span>(nums):
    tails = []
    <span class="kw">for</span> n <span class="kw">in</span> nums:
        pos = bisect.bisect_left(tails, n)
        <span class="kw">if</span> pos == <span class="kw">len</span>(tails): tails.append(n)
        <span class="kw">else</span>: tails[pos] = n
    <span class="kw">return</span> <span class="kw">len</span>(tails)`,
                tc: "O(n²) typical, O(n log n) LIS", sc: "O(n)",
                tip: "DP mantra: 'What is the minimum information I need to decide the next step?' That becomes your state. For 2D DP (LCS, edit distance): rows = string 1 chars, cols = string 2 chars, dp[i][j] = answer for prefixes of length i and j.",
                problems: [
                    { name: "Climbing Stairs", diff: "easy", url: "https://leetcode.com/problems/climbing-stairs/", tag: "fibonacci" },
                    { name: "House Robber", diff: "medium", url: "https://leetcode.com/problems/house-robber/", tag: "linear" },
                    { name: "Coin Change", diff: "medium", url: "https://leetcode.com/problems/coin-change/", tag: "unbounded knapsack" },
                    { name: "Longest Increasing Subsequence", diff: "medium", url: "https://leetcode.com/problems/longest-increasing-subsequence/", tag: "sequence" },
                    { name: "Edit Distance", diff: "hard", url: "https://leetcode.com/problems/edit-distance/", tag: "2D DP" },
                ]
            },
            {
                id: 11, icon: "🔗", title: "Fast & Slow Pointers", tagline: "Floyd's cycle detection trick",
                difficulty: "medium", color: "#00c8d4",
                lcLink: "https://leetcode.com/problems/linked-list-cycle/",
                intuition: `<strong>Two runners on a track:</strong> One runs 2x speed. If there's a loop, they WILL meet (fast catches slow). If no loop, fast hits the end. This is Floyd's cycle detection. Bonus: when slow is at middle of a list, fast has just reached the end. That's how you find middle in O(n) single pass.`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Cycle detection</strong> in linked list" },
                        { icon: "✅", text: "<strong>Find middle</strong> of linked list" },
                        { icon: "✅", text: "<strong>Find cycle start</strong> (Floyd's phase 2)" },
                        { icon: "✅", text: "<strong>Happy number</strong> (cycle in math sequence)" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Array problems → use two pointers (sorted) or sliding window" },
                        { icon: "❌", text: "Need to find multiple cycles" },
                    ],
                    signals: ["linked list cycle", "middle of list", "happy number", "palindrome linked list", "find duplicate number"],
                    notSignals: ["array", "sorted", "substring"],
                    howToDistinguish: `Fast/Slow = linked list problems with O(1) space requirement. If you see "linked list + cycle" or "linked list + find middle", it's almost certainly this pattern. Floyd's phase 2 (find cycle start): after meeting, reset slow to head, move both at speed 1.`
                },
                viz: "fastslow",
                code: `<span class="cm"># Detect Cycle</span>
<span class="kw">def</span> <span class="fn">has_cycle</span>(head):
    slow = fast = head
    <span class="kw">while</span> fast <span class="kw">and</span> fast.next:
        slow = slow.next
        fast = fast.next.next
        <span class="kw">if</span> slow == fast: <span class="kw">return True</span>
    <span class="kw">return False</span>

<span class="cm"># Find Cycle Start (Floyd's Phase 2)</span>
<span class="kw">def</span> <span class="fn">detect_cycle</span>(head):
    slow = fast = head
    <span class="kw">while</span> fast <span class="kw">and</span> fast.next:
        slow = slow.next; fast = fast.next.next
        <span class="kw">if</span> slow == fast:
            slow = head  <span class="cm"># reset slow to head</span>
            <span class="kw">while</span> slow != fast:
                slow = slow.next
                fast = fast.next
            <span class="kw">return</span> slow  <span class="cm"># cycle start!</span>
    <span class="kw">return None</span>`,
                tc: "O(n)", sc: "O(1)",
                tip: "Floyd's phase 2 (finding cycle start) is pure math magic: distance from head to cycle start = distance from meeting point to cycle start. Reset slow to head, move both at speed 1, they'll meet exactly at the cycle entry.",
                problems: [
                    { name: "Linked List Cycle", diff: "easy", url: "https://leetcode.com/problems/linked-list-cycle/", tag: "detect" },
                    { name: "Linked List Cycle II", diff: "medium", url: "https://leetcode.com/problems/linked-list-cycle-ii/", tag: "find start" },
                    { name: "Middle of the Linked List", diff: "easy", url: "https://leetcode.com/problems/middle-of-the-linked-list/", tag: "find middle" },
                    { name: "Happy Number", diff: "easy", url: "https://leetcode.com/problems/happy-number/", tag: "math cycle" },
                    { name: "Find the Duplicate Number", diff: "medium", url: "https://leetcode.com/problems/find-the-duplicate-number/", tag: "Floyd's" },
                ]
            },
            {
                id: 12, icon: "🔀", title: "Merge Intervals", tagline: "Sort by start, merge overlaps",
                difficulty: "medium", color: "#f5c842",
                lcLink: "https://leetcode.com/problems/merge-intervals/",
                intuition: `<strong>Calendar scheduling:</strong> You have meetings and need to find free slots. Sort by start time first. Then walk through: if the current meeting starts before the last one ends, they overlap — extend the end. Otherwise, new non-overlapping block. Sorting is the key that reduces this to a single pass.`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Overlapping intervals</strong> — merge/find intersections" },
                        { icon: "✅", text: "<strong>Meeting rooms</strong> — how many concurrent?" },
                        { icon: "✅", text: "<strong>Insert interval</strong> into sorted list" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Intervals that are never overlapping — just sort" },
                        { icon: "❌", text: "Need to track WHICH intervals overlap — use heap + events" },
                    ],
                    signals: ["merge intervals", "meeting rooms", "insert interval", "non-overlapping", "employee free time", "calendar"],
                    notSignals: ["single interval", "point query", "graph"],
                    howToDistinguish: `Sort by start time is almost always step 1. Then ask: "Does current interval overlap with last merged?" (current.start <= last.end). If overlapping, extend end. Meeting rooms count = max simultaneous overlaps (use event sweep or min-heap of end times).`
                },
                viz: "intervals",
                code: `<span class="cm"># Merge Intervals</span>
<span class="kw">def</span> <span class="fn">merge</span>(intervals):
    intervals.sort(key=<span class="kw">lambda</span> x: x[<span class="nm">0</span>])
    merged = [intervals[<span class="nm">0</span>]]
    <span class="kw">for</span> s, e <span class="kw">in</span> intervals[<span class="nm">1</span>:]:
        <span class="kw">if</span> s <= merged[-<span class="nm">1</span>][<span class="nm">1</span>]:
            merged[-<span class="nm">1</span>][<span class="nm">1</span>] = <span class="kw">max</span>(merged[-<span class="nm">1</span>][<span class="nm">1</span>], e)
        <span class="kw">else</span>: merged.append([s, e])
    <span class="kw">return</span> merged

<span class="cm"># Meeting Rooms II (min rooms needed)</span>
<span class="kw">def</span> <span class="fn">min_rooms</span>(intervals):
    <span class="kw">import</span> heapq
    intervals.sort()
    heap = []
    <span class="kw">for</span> s, e <span class="kw">in</span> intervals:
        <span class="kw">if</span> heap <span class="kw">and</span> heap[<span class="nm">0</span>] <= s:
            heapq.heapreplace(heap, e)
        <span class="kw">else</span>:
            heapq.heappush(heap, e)
    <span class="kw">return</span> <span class="kw">len</span>(heap)`,
                tc: "O(n log n)", sc: "O(n)",
                tip: "Meeting rooms = max concurrent intervals. The heap approach: heap stores end times of ongoing meetings. New meeting starts after earliest end? Reuse that room (heapreplace). Else: new room (heappush). Heap size = rooms needed.",
                problems: [
                    { name: "Merge Intervals", diff: "medium", url: "https://leetcode.com/problems/merge-intervals/", tag: "classic" },
                    { name: "Insert Interval", diff: "medium", url: "https://leetcode.com/problems/insert-interval/", tag: "insert" },
                    { name: "Meeting Rooms II", diff: "medium", url: "https://leetcode.com/problems/meeting-rooms-ii/", tag: "count rooms" },
                    { name: "Non-overlapping Intervals", diff: "medium", url: "https://leetcode.com/problems/non-overlapping-intervals/", tag: "greedy" },
                    { name: "Employee Free Time", diff: "hard", url: "https://leetcode.com/problems/employee-free-time/", tag: "gaps" },
                ]
            },
            {
                id: 13, icon: "🌳", title: "Tree DFS / Recursion", tagline: "Build answers bottom-up through trees",
                difficulty: "hard", color: "#ff7b4b",
                lcLink: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
                intuition: `<strong>Post-order thinking:</strong> For almost every tree problem, recurse down to leaves, then build your answer on the way back up. At each node: "What can I learn from my left child + right child?" The tricky part: sometimes you need to return DIFFERENT information as you go up vs. what you're tracking globally. Use a nonlocal variable or list for the global answer.`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Height, depth, diameter</strong> of tree" },
                        { icon: "✅", text: "<strong>Path sums</strong> in tree" },
                        { icon: "✅", text: "<strong>Lowest common ancestor</strong>" },
                        { icon: "✅", text: "<strong>Tree shape validation</strong> — balanced, BST" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Level-by-level info needed → BFS (level order)" },
                        { icon: "❌", text: "Not a tree structure → DFS/BFS for general graphs" },
                    ],
                    signals: ["tree", "path sum", "diameter", "max depth", "lowest common ancestor", "serialize", "balanced", "invert"],
                    notSignals: ["level order", "BFS needed", "graph (not tree)"],
                    howToDistinguish: `Tree DFS = recursion on root.left and root.right. Ask: "Does the answer at a node depend on BOTH children?" → post-order DFS. Two-return-value trick: recursive function returns one thing (e.g., height) but updates a global max (e.g., diameter) as a side effect.`
                },
                viz: "treedfs",
                code: `<span class="cm"># Max Path Sum (global + local return)</span>
<span class="kw">def</span> <span class="fn">max_path_sum</span>(root):
    res = [float(<span class="st">'-inf'</span>)]
    <span class="kw">def</span> <span class="fn">dfs</span>(node):
        <span class="kw">if not</span> node: <span class="kw">return</span> <span class="nm">0</span>
        l = <span class="kw">max</span>(dfs(node.left), <span class="nm">0</span>)
        r = <span class="kw">max</span>(dfs(node.right), <span class="nm">0</span>)
        res[<span class="nm">0</span>] = <span class="kw">max</span>(res[<span class="nm">0</span>], node.val + l + r)
        <span class="kw">return</span> node.val + <span class="kw">max</span>(l, r)
    dfs(root); <span class="kw">return</span> res[<span class="nm">0</span>]

<span class="cm"># Diameter of Binary Tree</span>
<span class="kw">def</span> <span class="fn">diameter</span>(root):
    res = [<span class="nm">0</span>]
    <span class="kw">def</span> <span class="fn">height</span>(node):
        <span class="kw">if not</span> node: <span class="kw">return</span> <span class="nm">0</span>
        l, r = height(node.left), height(node.right)
        res[<span class="nm">0</span>] = <span class="kw">max</span>(res[<span class="nm">0</span>], l+r)
        <span class="kw">return</span> <span class="nm">1</span> + <span class="kw">max</span>(l, r)
    height(root); <span class="kw">return</span> res[<span class="nm">0</span>]`,
                tc: "O(n)", sc: "O(h)",
                tip: "The global-variable trick: DFS returns 'best single branch upward' but updates global max with 'best path THROUGH this node' (l + r + val). These are two different things! The function returns one, updates global with the other.",
                problems: [
                    { name: "Binary Tree Maximum Path Sum", diff: "hard", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", tag: "global trick" },
                    { name: "Diameter of Binary Tree", diff: "easy", url: "https://leetcode.com/problems/diameter-of-binary-tree/", tag: "height" },
                    { name: "Maximum Depth of Binary Tree", diff: "easy", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", tag: "depth" },
                    { name: "Lowest Common Ancestor", diff: "medium", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", tag: "LCA" },
                    { name: "Binary Tree Cameras", diff: "hard", url: "https://leetcode.com/problems/binary-tree-cameras/", tag: "greedy+DFS" },
                ]
            },
            {
                id: 14, icon: "📋", title: "Topological Sort", tagline: "Order tasks respecting dependencies",
                difficulty: "hard", color: "#f03e84",
                lcLink: "https://leetcode.com/problems/course-schedule/",
                intuition: `<strong>Getting dressed analogy:</strong> Can't put shoes before socks. Can't wear shirt before underwear. Topological sort gives a valid ordering of tasks given dependencies. Kahn's algorithm (BFS with in-degrees) is the cleanest implementation. Bonus: if any node is left unprocessed, there's a cycle — so it doubles as cycle detection.`,
                distinguish: {
                    apply: [
                        { icon: "✅", text: "<strong>Course prerequisites</strong> — can you finish?" },
                        { icon: "✅", text: "<strong>Build order</strong> of dependencies" },
                        { icon: "✅", text: "<strong>Cycle detection</strong> in directed graph" },
                        { icon: "✅", text: "<strong>Alien dictionary</strong> — derive ordering" },
                    ],
                    avoid: [
                        { icon: "❌", text: "Undirected graph → use DFS/BFS union-find" },
                        { icon: "❌", text: "Weighted graph — topological sort ignores weights" },
                    ],
                    signals: ["prerequisites", "dependencies", "build order", "alien dictionary", "task order", "before", "after"],
                    notSignals: ["undirected", "shortest path", "unweighted graph"],
                    howToDistinguish: `Whenever you see "A must come before B" constraints → topological sort. The in-degree trick: nodes with in-degree 0 have no prerequisites, start there. If final count < total nodes → cycle exists. DFS version uses 3-color (white/gray/black) marking.`
                },
                viz: "topo",
                code: `<span class="kw">from</span> collections <span class="kw">import</span> deque, defaultdict

<span class="cm"># Course Schedule (Kahn's BFS)</span>
<span class="kw">def</span> <span class="fn">can_finish</span>(n, prereqs):
    graph = defaultdict(list)
    indegree = [<span class="nm">0</span>] * n
    <span class="kw">for</span> a, b <span class="kw">in</span> prereqs:
        graph[b].append(a)
        indegree[a] += <span class="nm">1</span>
    q = deque(i <span class="kw">for</span> i <span class="kw">in</span> <span class="kw">range</span>(n) <span class="kw">if</span> indegree[i]==<span class="nm">0</span>)
    taken = <span class="nm">0</span>
    <span class="kw">while</span> q:
        c = q.popleft(); taken += <span class="nm">1</span>
        <span class="kw">for</span> nxt <span class="kw">in</span> graph[c]:
            indegree[nxt] -= <span class="nm">1</span>
            <span class="kw">if</span> indegree[nxt] == <span class="nm">0</span>: q.append(nxt)
    <span class="kw">return</span> taken == n  <span class="cm"># False = cycle!</span>`,
                tc: "O(V+E)", sc: "O(V+E)",
                tip: "Cycle detection is the hidden superpower: if taken < n after Kahn's → cycle exists → impossible to finish. DFS variant uses 3 states: 0=unvisited, 1=in-progress (cycle if we see 1 again!), 2=done.",
                problems: [
                    { name: "Course Schedule", diff: "medium", url: "https://leetcode.com/problems/course-schedule/", tag: "cycle detect" },
                    { name: "Course Schedule II", diff: "medium", url: "https://leetcode.com/problems/course-schedule-ii/", tag: "order" },
                    { name: "Alien Dictionary", diff: "hard", url: "https://leetcode.com/problems/alien-dictionary/", tag: "derive order" },
                    { name: "Sequence Reconstruction", diff: "medium", url: "https://leetcode.com/problems/sequence-reconstruction/", tag: "unique order" },
                    { name: "Minimum Height Trees", diff: "medium", url: "https://leetcode.com/problems/minimum-height-trees/", tag: "tree topo" },
                ]
            },
        ];

        // ========== VISUALIZERS ==========
        const VIZS = {
            twopointers: (container) => {
                const nums = [1, 2, 4, 6, 8, 10]; const target = 7;
                let l = 0, r = nums.length - 1, step = 0, done = false;
                const steps = [];
                let tl = 0, tr = nums.length - 1;
                while (tl < tr) {
                    const s = nums[tl] + nums[tr];
                    if (s === target) { steps.push({ l: tl, r: tr, msg: `✅ Found! ${nums[tl]} + ${nums[tr]} = ${target}`, found: true }); break; }
                    else if (s < target) { steps.push({ l: tl, r: tr, msg: `Sum ${s} < ${target} → move L right`, found: false }); tl++; }
                    else { steps.push({ l: tl, r: tr, msg: `Sum ${s} > ${target} → move R left`, found: false }); tr--; }
                }
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">TWO SUM II — target = ${target}</div><div class="arr-row">`;
                    nums.forEach((n, i) => {
                        let cls = '';
                        if (i === st.l && i === st.r) cls = 'ptr-l';
                        else if (i === st.l) cls = 'ptr-l';
                        else if (i === st.r) cls = 'ptr-r';
                        if (st.found && (i === st.l || i === st.r)) cls = 'found';
                        html += `<div class="arr-cell ${cls}">${n}${i === st.l ? '<span class="ptr-label">L</span>' : ''}${i === st.r ? '<span class="ptr-label">R</span>' : ''}</div>`;
                    });
                    html += `</div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-title"></div><div class="viz-controls"><button class="viz-btn" id="vPrev">◀ Prev</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">Next ▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 900); };
            },
            slidingwindow: (container) => {
                const nums = [2, 1, 5, 1, 3, 2]; const k = 3;
                let steps = [];
                let ws = nums.slice(0, k).reduce((a, b) => a + b, 0), best = ws;
                steps.push({ l: 0, r: k - 1, sum: ws, best, msg: `Initial window sum = ${ws}` });
                for (let i = k; i < nums.length; i++) {
                    ws += nums[i] - nums[i - k]; if (ws > best) best = ws;
                    steps.push({ l: i - k + 1, r: i, sum: ws, best, msg: `Add ${nums[i]}, remove ${nums[i - k]} → sum=${ws}, best=${best}` });
                }
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">MAX SUM SUBARRAY k=${k}</div><div class="arr-row">`;
                    nums.forEach((n, i) => {
                        const cls = (i >= st.l && i <= st.r) ? 'window' : '';
                        html += `<div class="arr-cell ${cls}">${n}</div>`;
                    });
                    html += `</div><div style="margin-top:10px;font-size:12px;color:var(--cyan)">Window [${st.l}..${st.r}] | Sum: ${st.sum} | Best so far: <span style="color:var(--yellow)">${st.best}</span></div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀ Prev</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">Next ▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 900); };
            },
            prefixsum: (container) => {
                const nums = [1, 2, 3, 4, 5];
                const pre = [0, ...nums].reduce((a, n, i) => (i ? [...a, a[a.length - 1] + n] : [0]), [0]);
                const pre2 = [0]; for (let i = 0; i < nums.length; i++) pre2.push(pre2[pre2.length - 1] + nums[i]);
                const queries = [[1, 3], [0, 2], [2, 4]];
                let qi = 0;
                function render() {
                    const [l, r] = queries[qi];
                    const ans = pre2[r + 1] - pre2[l];
                    let html = `<div class="viz-title">PREFIX SUM — nums=[${nums}]</div>`;
                    html += `<div style="font-size:12px;color:var(--muted);margin-bottom:6px">prefix = [${pre2}]</div>`;
                    html += `<div class="arr-row">`;
                    nums.forEach((n, i) => { html += `<div class="arr-cell ${i >= l && i <= r ? 'window' : ''}">${n}</div>`; });
                    html += `</div><div style="margin-top:12px;font-size:13px">Query sum[${l}..${r}] = prefix[${r + 1}] - prefix[${l}] = <span style="color:var(--cyan)">${pre2[r + 1]}</span> - <span style="color:var(--orange)">${pre2[l]}</span> = <span style="color:var(--green);font-weight:700">${ans}</span></div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vq">Next Query</button></div><div class="viz-stage"></div>`;
                render();
                container.querySelector('#vq').onclick = () => { qi = (qi + 1) % queries.length; render(); };
            },
            hashmap: (container) => {
                const nums = [2, 7, 11, 15]; const target = 9;
                let steps = [{ i: -1, seen: {}, msg: 'Start: empty map' }];
                let seen = {};
                nums.forEach((n, i) => {
                    const comp = target - n;
                    const found = comp in seen;
                    steps.push({ i, n, comp, found, seen: { ...seen }, msg: found ? `✅ Found! ${comp} is in map → [${seen[comp]},${i}]` : `Need ${comp}, not found → store {${n}:${i}}` });
                    if (!found) seen[n] = i;
                });
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">TWO SUM — target=${target}</div><div class="arr-row">`;
                    nums.forEach((n, i) => {
                        let cls = '';
                        if (st.found && (n === st.n || n === st.comp)) cls = 'found';
                        else if (i === st.i) cls = 'highlight';
                        html += `<div class="arr-cell ${cls}">${n}</div>`;
                    });
                    html += `</div><div style="margin-top:10px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--cyan)">Map: {${Object.entries(st.seen).map(([k, v]) => `${k}:${v}`).join(', ')}}</div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 1000); };
            },
            stack: (container) => {
                const str = '({[]})';
                const pairs = { ')': '(', ']': '[', '}': '{' };
                let steps = [];
                let stack = [];
                for (const c of str) {
                    if ('([{'.includes(c)) {
                        stack = [...stack, c];
                        steps.push({ stack: [...stack], c, action: `Push '${c}'`, valid: true });
                    } else {
                        const ok = stack.length && stack[stack.length - 1] === pairs[c];
                        if (ok) { stack.pop(); steps.push({ stack: [...stack], c, action: `Pop '${pairs[c]}' matches '${c}' ✅`, valid: true }); }
                        else { steps.push({ stack: [...stack], c, action: `Mismatch! ❌`, valid: false }); break; }
                    }
                }
                if (stack.length === 0) steps.push({ stack: [], c: '', action: 'Stack empty → VALID ✅', valid: true });
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    const processed = str.slice(0, idx + 1);
                    let html = `<div class="viz-title">VALID PARENTHESES — "${str}"</div>`;
                    html += `<div style="font-family:'JetBrains Mono';font-size:14px;margin-bottom:10px"><span style="color:var(--green)">${processed}</span><span style="color:var(--muted)">${str.slice(idx + 1)}</span></div>`;
                    html += `<div style="font-size:12px;color:var(--muted);margin-bottom:6px">Stack:</div><div class="arr-row">`;
                    if (st.stack.length === 0) html += `<span style="color:var(--muted);font-size:12px">(empty)</span>`;
                    st.stack.forEach((c, i) => html += `<div class="arr-cell ${i === st.stack.length - 1 ? 'highlight' : ''}">${c}</div>`);
                    html += `</div><div class="viz-step-info">${st.action}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 900); };
            },
            bfs: (container) => {
                const nodeVals = [1, 2, 3, 4, 5, 6];
                const children = { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] };
                const levels = [[1], [2, 3], [4, 5, 6]];
                let steps = [{ queue: [1], visited: new Set(), processing: null, level: 0, msg: 'Start: queue=[1]' }];
                for (let li = 0; li < levels.length; li++) {
                    for (let ni = 0; ni < levels[li].length; ni++) {
                        const n = levels[li][ni];
                        const nexts = children[n] || [];
                        const nq = li < levels.length - 1 ? levels[li].slice(ni + 1).concat(levels[li + 1] || []) : levels[li].slice(ni + 1);
                        steps.push({ queue: nq, visited: new Set(levels.slice(0, li).flat().concat(levels[li].slice(0, ni + 1))), processing: n, level: li, msg: `Process ${n} → add children [${nexts.join(',')}] to queue` });
                    }
                }
                steps.push({ queue: [], visited: new Set(nodeVals), processing: null, level: 3, msg: 'Queue empty — all nodes visited ✅' });
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    const positions = { 1: { x: 50, y: 10 }, 2: { x: 25, y: 38 }, 3: { x: 75, y: 38 }, 4: { x: 12, y: 66 }, 5: { x: 38, y: 66 }, 6: { x: 62, y: 66 } };
                    let html = `<div class="viz-title">BFS LEVEL ORDER TRAVERSAL</div><div class="graph-wrap" style="height:160px;position:relative">`;
                    const edges = [[1, 2], [1, 3], [2, 4], [2, 5], [3, 6]];
                    edges.forEach(([a, b]) => {
                        const pa = positions[a], pb = positions[b];
                        const dx = (pb.x - pa.x) * 2.8, dy = (pb.y - pa.y) * 1.4;
                        const len = Math.sqrt(dx * dx + dy * dy);
                        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                        html += `<div class="g-edge" style="left:${pa.x}%;top:${pa.y * 1.1 + 5}%;width:${len}px;transform:rotate(${angle}deg)"></div>`;
                    });
                    nodeVals.forEach(n => {
                        const p = positions[n];
                        let cls = '';
                        if (st.processing === n) cls = 'current';
                        else if (st.visited.has(n)) cls = 'visited';
                        else if (st.queue.includes(n)) cls = 'queued';
                        html += `<div class="g-node ${cls}" style="left:calc(${p.x}% - 18px);top:calc(${p.y * 1.1 + 2}% )">${n}</div>`;
                    });
                    html += `</div><div style="font-size:12px;color:var(--cyan);margin-top:6px">Queue: [${st.queue.join(', ') || 'empty'}]</div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 1100); };
            },
            dfs: (container) => {
                const grid = [['1', '1', '0'], ['1', '0', '0'], ['0', '0', '1']];
                const orig = grid.map(r => [...r]);
                let steps = []; let cnt = 0;
                function dfs(r, c, g, islands) {
                    if (r < 0 || r >= 3 || c < 0 || c >= 3 || g[r][c] !== '1') return;
                    g[r][c] = '0';
                    steps.push({ grid: g.map(row => [...row]), msg: `Sinking (${r},${c}) — island ${islands}`, island: islands });
                    dfs(r + 1, c, g, islands); dfs(r - 1, c, g, islands); dfs(r, c + 1, g, islands); dfs(r, c - 1, g, islands);
                }
                const g = orig.map(r => [...r]);
                let isl = 0;
                for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (g[r][c] === '1') { isl++; steps.push({ grid: g.map(row => [...row]), msg: `Found land at (${r},${c}) → starting island ${isl}`, island: isl }); dfs(r, c, g, isl); }
                steps.push({ grid: g.map(r => [...r]), msg: `Done! Total islands = ${isl} ✅`, island: isl });
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">NUMBER OF ISLANDS (DFS sinking)</div><div style="display:flex;gap:6px;flex-wrap:wrap">`;
                    for (let r = 0; r < 3; r++) {
                        for (let c = 0; c < 3; c++) {
                            const v = orig[r][c];
                            const cur = st.grid[r][c];
                            let cls = cur === '0' && v === '1' ? 'removed' : v === '1' ? 'highlight' : '';
                            html += `<div class="arr-cell ${cls}" style="border-radius:6px">${orig[r][c] === '1' ? '🏝' : '🌊'}</div>`;
                        }
                        if (r < 2) html += `<div style="width:100%;height:0"></div>`;
                    }
                    html += `</div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 800); };
            },
            backtracking: (container) => {
                const nums = [1, 2, 3];
                const results = []; const steps = [];
                function bt(start, cur) {
                    results.push([...cur]); steps.push({ cur: [...cur], msg: `Snapshot: [${cur}]` });
                    for (let i = start; i < nums.length; i++) {
                        cur.push(nums[i]); steps.push({ cur: [...cur], msg: `Choose ${nums[i]} → path=[${cur}]` });
                        bt(i + 1, cur);
                        cur.pop(); steps.push({ cur: [...cur], msg: `Unchoose → backtrack to [${cur}]` });
                    }
                }
                bt(0, []);
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">SUBSETS of [1,2,3]</div><div style="margin-bottom:10px"><div style="font-size:12px;color:var(--muted)">Current path:</div><div class="arr-row">`;
                    if (st.cur.length === 0) html += `<span style="color:var(--muted);font-size:12px">(empty)</span>`;
                    st.cur.forEach(n => html += `<div class="arr-cell highlight">${n}</div>`);
                    html += `</div></div><div style="font-size:12px;color:var(--muted);margin-bottom:6px">Collected so far:</div><div style="display:flex;flex-wrap:wrap;gap:6px">`;
                    results.slice(0, results.filter((r, ri) => ri <= si / 3).length + 1).forEach(r => html += `<span style="background:rgba(108,99,255,0.1);border:1px solid var(--border);border-radius:5px;padding:3px 8px;font-size:11px;font-family:'JetBrains Mono',monospace">[${r}]</span>`);
                    html += `</div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 700); };
            },
            binarysearch: (container) => {
                const nums = [1, 3, 5, 7, 9, 11, 13, 15]; const target = 7;
                let steps = []; let l = 0, r = nums.length - 1;
                while (l <= r) {
                    const mid = Math.floor((l + r) / 2);
                    if (nums[mid] === target) { steps.push({ l, r, mid, msg: `nums[${mid}]=${nums[mid]} == ${target} ✅ FOUND!`, found: true }); break; }
                    else if (nums[mid] < target) { steps.push({ l, r, mid, msg: `nums[${mid}]=${nums[mid]} < ${target} → search right half`, found: false }); l = mid + 1; }
                    else { steps.push({ l, r, mid, msg: `nums[${mid}]=${nums[mid]} > ${target} → search left half`, found: false }); r = mid - 1; }
                }
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">BINARY SEARCH — target=${target}</div><div class="arr-row">`;
                    nums.forEach((n, i) => {
                        let cls = '';
                        if (i === st.mid) cls = st.found ? 'found' : 'highlight';
                        else if (i < st.l || i > st.r) cls = 'removed';
                        html += `<div class="arr-cell ${cls}">${n}</div>`;
                    });
                    html += `</div><div style="margin-top:8px;font-size:12px;color:var(--cyan)">L=${st.l} mid=${st.mid} R=${st.r}</div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 1000); };
            },
            heap: (container) => {
                const nums = [3, 1, 4, 1, 5, 9, 2, 6]; const k = 3;
                let steps = []; let heap = [];
                function heapPush(h, v) { h.push(v); h.sort((a, b) => a - b); }
                function heapPop(h) { return h.shift(); }
                for (let i = 0; i < nums.length; i++) {
                    heapPush(heap, nums[i]);
                    let msg = `Push ${nums[i]} → heap=[${[...heap]}]`;
                    if (heap.length > k) { const rem = heapPop(heap); msg += ` → pop ${rem} (smallest) → heap=[${[...heap]}]`; }
                    steps.push({ heap: [...heap], i, msg, nums: [...nums] });
                }
                steps.push({ heap: [...heap], i: nums.length, msg: `Final heap=[${heap}] → K largest! Answer: ${heap[0]} is ${k}rd largest`, nums: [...nums] });
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">KTH LARGEST (k=${k}) — min-heap of size k</div><div class="arr-row">`;
                    st.nums.forEach((n, i) => { html += `<div class="arr-cell ${i === st.i ? 'highlight' : ''}">${n}</div>`; });
                    html += `</div><div style="margin-top:10px;font-size:12px;color:var(--muted)">Heap (size k=${k}):  </div><div class="arr-row">`;
                    st.heap.forEach((n, i) => html += `<div class="arr-cell ${i === 0 ? 'ptr-l' : ''}">${n}${i === 0 ? '<span class="ptr-label">min</span>' : ''}</div>`);
                    html += `</div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 900); };
            },
            dp: (container) => {
                const n = 7;
                let steps = [{ dp: [1, 1], msg: 'Base: dp[1]=1, dp[2]=2' }];
                let dp = [0, 1, 2];
                for (let i = 3; i <= n; i++) {
                    dp.push(dp[i - 1] + dp[i - 2]);
                    steps.push({ dp: [...dp.slice(1)], msg: `dp[${i}] = dp[${i - 1}]+dp[${i - 2}] = ${dp[i - 1]}+${dp[i - 2]} = ${dp[i]}` });
                }
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">CLIMBING STAIRS (n=7) — ways to reach each step</div><div class="arr-row">`;
                    st.dp.forEach((v, i) => {
                        const isLast = i === st.dp.length - 1;
                        html += `<div class="arr-cell ${isLast ? 'found' : 'window'}" style="width:44px;height:44px"><span style="font-size:10px;color:var(--muted)">${i + 1}</span><br>${v}</div>`;
                    });
                    html += `</div><div style="margin-top:6px;font-size:11px;color:var(--muted)">index (step number)</div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 800); };
            },
            fastslow: (container) => {
                const list = [1, 2, 3, 4, 5, 3]; // 5 points back to index 2 (val 3)
                const steps = [];
                let s = 0, f = 0;
                for (let i = 0; i < 8; i++) {
                    const nextF = f + 1 >= list.length ? 2 : (f + 1); // loop at 5→2
                    const nextFF = nextF + 1 >= list.length ? 2 : (nextF + 1);
                    steps.push({ s, f, msg: `slow=${list[s]}, fast=${list[f]} ${s === f && i > 0 ? '→ MEET! Cycle detected ✅' : ''}` });
                    if (s === f && i > 0) break;
                    s = s + 1 >= list.length ? 2 : s + 1;
                    f = nextFF;
                }
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">CYCLE DETECTION — 1→2→3→4→5→3 (cycle!)</div><div class="arr-row">`;
                    list.forEach((n, i) => {
                        let cls = '';
                        if (i === st.s && i === st.f) cls = 'found';
                        else if (i === st.s) cls = 'ptr-l';
                        else if (i === st.f) cls = 'ptr-r';
                        html += `<div class="arr-cell ${cls}">${n}${i === st.s ? '<span class="ptr-label">S</span>' : ''}${i === st.f && i !== st.s ? '<span class="ptr-label">F</span>' : ''}</div>`;
                    });
                    html += `<div class="arr-cell" style="opacity:.4;font-size:10px">→3</div></div>`;
                    html += `<div style="display:flex;gap:16px;margin-top:8px;font-size:12px"><span style="color:var(--orange)">🐢 Slow: +1 step</span><span style="color:var(--cyan)">🐇 Fast: +2 steps</span></div>`;
                    html += `<div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 1000); };
            },
            intervals: (container) => {
                const raw = [[1, 3], [2, 6], [8, 10], [15, 18]];
                let steps = [{ merged: [[...raw[0]]], msg: `Start with [${raw[0]}]` }];
                let merged = [[...raw[0]]];
                for (let i = 1; i < raw.length; i++) {
                    const [s, e] = raw[i];
                    if (s <= merged[merged.length - 1][1]) {
                        const old = merged[merged.length - 1][1];
                        merged[merged.length - 1][1] = Math.max(old, e);
                        steps.push({ merged: merged.map(m => [...m]), msg: `[${s},${e}] overlaps (${s}≤${old}) → extend to [${merged[merged.length - 1]}]` });
                    } else {
                        merged.push([s, e]);
                        steps.push({ merged: merged.map(m => [...m]), msg: `[${s},${e}] no overlap → append` });
                    }
                }
                let si = 0;
                const colors = ['#6c63ff', '#00d48a', '#f5c842', '#f03e84'];
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">MERGE INTERVALS</div>`;
                    html += `<div style="position:relative;height:50px;background:var(--code-bg);border-radius:8px;margin-bottom:12px;overflow:hidden">`;
                    const scale = w => ((w - 1) / 18) * 100;
                    raw.forEach((iv, i) => {
                        html += `<div style="position:absolute;height:14px;top:${4 + i * 9}px;left:${scale(iv[0])}%;width:${scale(iv[1]) - scale(iv[0]) + 2}%;background:${colors[i]};opacity:.4;border-radius:3px"></div>`;
                    });
                    html += `</div><div style="font-size:12px;color:var(--muted);margin-bottom:6px">Merged:</div><div class="arr-row">`;
                    st.merged.forEach((iv, i) => html += `<div class="arr-cell window" style="width:auto;padding:0 8px;font-size:11px">[${iv[0]},${iv[1]}]</div>`);
                    html += `</div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv2;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv2) { clearInterval(iv2); iv2 = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv2 = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv2); iv2 = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 1000); };
            },
            treedfs: (container) => {
                // Tree: root=-10, left=9, right=20(left=15,right=7)
                const steps = [
                    { active: null, path: [], done: [], msg: 'Start DFS from root' },
                    { active: 9, path: [9], done: [], msg: 'At leaf 9: left=0, right=0 → returns 9' },
                    { active: 15, path: [15], done: [9], msg: 'At leaf 15: returns 15' },
                    { active: 7, path: [7], done: [9, 15], msg: 'At leaf 7: returns 7' },
                    { active: 20, path: [20, 15, 7], done: [9], msg: 'At 20: left=15, right=7 → path through 20 = 15+20+7=42 ✅' },
                    { active: -10, path: [-10, 20], done: [9, 15, 7], msg: 'At -10: best through -10 < 42 → global max stays 42' },
                    { active: null, path: [], done: [9, 15, 20, 7, -10], msg: 'Answer: 42 ✅ (path: 15→20→7)' },
                ];
                const nodes = [
                    { val: -10, x: 50, y: 8, id: 'root' },
                    { val: 9, x: 25, y: 36, id: 'l' },
                    { val: 20, x: 75, y: 36, id: 'r' },
                    { val: 15, x: 60, y: 64, id: 'rl' },
                    { val: 7, x: 90, y: 64, id: 'rr' },
                ];
                const edges = [['root', 'l'], ['root', 'r'], ['r', 'rl'], ['r', 'rr']];
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">MAX PATH SUM — global best tracked separately</div><div class="graph-wrap" style="height:155px">`;
                    edges.forEach(([a, b]) => {
                        const na = nodes.find(n => n.id === a), nb = nodes.find(n => n.id === b);
                        const dx = (nb.x - na.x) * 2.6, dy = (nb.y - na.y) * 1.3;
                        const len = Math.sqrt(dx * dx + dy * dy);
                        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                        html += `<div class="g-edge" style="left:${na.x}%;top:${na.y * 1.1 + 3}%;width:${len}px;transform:rotate(${angle}deg)"></div>`;
                    });
                    nodes.forEach(n => {
                        let cls = '';
                        if (n.val === st.active) cls = 'current';
                        else if (st.done.includes(n.val)) cls = 'visited';
                        else if (st.path.includes(n.val)) cls = 'queued';
                        html += `<div class="g-node ${cls}" style="left:calc(${n.x}% - 18px);top:calc(${n.y * 1.08}%)">${n.val}</div>`;
                    });
                    html += `</div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 1100); };
            },
            topo: (container) => {
                // courses 0→1,0→2,1→3,2→3
                const nodes = [{ id: 0, x: 10, y: 40 }, { id: 1, x: 40, y: 15 }, { id: 2, x: 40, y: 65 }, { id: 3, x: 75, y: 40 }];
                const edges = [[0, 1], [0, 2], [1, 3], [2, 3]];
                let indeg = [0, 1, 1, 2];
                const steps = [
                    { queue: [0], taken: [], indeg: [0, 1, 1, 2], msg: 'in-degree 0 → queue=[0]' },
                    { queue: [1, 2], taken: [0], indeg: [0, 0, 0, 2], msg: 'Take 0, reduce neighbors → queue=[1,2]' },
                    { queue: [2], taken: [0, 1], indeg: [0, 0, 0, 1], msg: 'Take 1, reduce 3 → indeg[3]=1' },
                    { queue: [3], taken: [0, 1, 2], indeg: [0, 0, 0, 0], msg: 'Take 2, reduce 3 → indeg[3]=0' },
                    { queue: [], taken: [0, 1, 2, 3], indeg: [0, 0, 0, 0], msg: 'Take 3 → queue empty! taken=4=n ✅ No cycle!' },
                ];
                let si = 0;
                function render(idx) {
                    const st = steps[idx];
                    let html = `<div class="viz-title">TOPOLOGICAL SORT (Kahn's) — Course Schedule</div><div class="graph-wrap" style="height:140px">`;
                    edges.forEach(([a, b]) => {
                        const na = nodes.find(n => n.id === a), nb = nodes.find(n => n.id === b);
                        const dx = (nb.x - na.x) * 2.4, dy = (nb.y - na.y) * 1.2;
                        const len = Math.sqrt(dx * dx + dy * dy);
                        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                        html += `<div class="g-edge" style="left:${na.x}%;top:${na.y}%;width:${len}px;transform:rotate(${angle}deg)"></div>`;
                    });
                    nodes.forEach(n => {
                        let cls = '';
                        if (st.taken.includes(n.id)) cls = 'visited';
                        else if (st.queue.includes(n.id)) cls = 'current';
                        html += `<div class="g-node ${cls}" style="left:calc(${n.x}% - 18px);top:calc(${n.y}% - 8px)">${n.id}<span style="position:absolute;top:-14px;font-size:9px;color:var(--yellow)">${st.indeg[n.id]}</span></div>`;
                    });
                    html += `</div><div style="font-size:12px;color:var(--cyan)">Queue: [${st.queue}] | Taken: [${st.taken}]</div><div class="viz-step-info">${st.msg}</div>`;
                    container.querySelector('.viz-stage').innerHTML = html;
                }
                container.innerHTML = `<div class="viz-controls"><button class="viz-btn" id="vPrev">◀</button><button class="viz-btn" id="vPlay">▶ Play</button><button class="viz-btn" id="vNext">▶</button></div><div class="viz-stage"></div>`;
                render(0);
                let iv;
                container.querySelector('#vNext').onclick = () => { if (si < steps.length - 1) { si++; render(si); } };
                container.querySelector('#vPrev').onclick = () => { if (si > 0) { si--; render(si); } };
                container.querySelector('#vPlay').onclick = function () { if (iv) { clearInterval(iv); iv = null; this.textContent = '▶ Play'; return; } this.textContent = '⏸ Pause'; si = 0; render(si); iv = setInterval(() => { if (si < steps.length - 1) { si++; render(si); } else { clearInterval(iv); iv = null; container.querySelector('#vPlay').textContent = '▶ Play'; } }, 1100); };
            },
        };

        // ===== STATE =====
        let learned = new Set(JSON.parse(localStorage.getItem('dsa_v2_learned') || '[]'));
        let activeFilter = 'all'; let currentId = null; let activeTab = 'overview';

        function saveProgress() {
            try { localStorage.setItem('dsa_v2_learned', JSON.stringify([...learned])); } catch (e) { }
            const pct = (learned.size / PATTERNS.length) * 100;
            document.getElementById('progFill').style.width = pct + '%';
            document.getElementById('progNum').textContent = `${learned.size} / ${PATTERNS.length}`;
        }

        function renderGrid(filter = 'all', query = '') {
            const grid = document.getElementById('grid'); grid.innerHTML = '';
            PATTERNS.filter(p => {
                const mf = filter === 'all' || p.difficulty === filter;
                const mq = !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.tagline.toLowerCase().includes(query.toLowerCase());
                return mf && mq;
            }).forEach((p, i) => {
                const isL = learned.has(p.id);
                const d = document.createElement('div');
                d.className = 'card-wrap' + (isL ? ' is-learned' : '');
                d.style.animationDelay = (i * .05) + 's';
                const snip = p.intuition.replace(/<[^>]+>/g, '').slice(0, 130) + '...';
                d.innerHTML = `<div class="pat-card" onclick="openModal(${p.id})">
      <div class="ch">
        <div class="icon-wrap" style="background:${p.color}1a">${p.icon}</div>
        <div class="cmeta">
          <div class="ctitle">${p.title} <span class="learned-pip"></span></div>
          <div class="ctagline">${p.tagline}</div>
        </div>
        <div class="dbadge ${p.difficulty}">${p.difficulty}</div>
      </div>
      <div class="cb">
        <div class="intuition-snip">${snip}</div>
        <div class="signal-row">${p.distinguish.signals.slice(0, 4).map(s => `<span class="signal">${s}</span>`).join('')}</div>
        <button class="open-btn">📖 Deep Dive + Visualize →</button>
      </div>
    </div>`;
                grid.appendChild(d);
            });
        }

        // ===== MODAL =====
        function openModal(id) {
            currentId = id; const p = PATTERNS[id];
            document.getElementById('mhIcon').textContent = p.icon;
            document.getElementById('mhTitle').textContent = p.title;
            document.getElementById('lcLink').href = p.lcLink;
            const lb = document.getElementById('learnBtn');
            lb.textContent = learned.has(id) ? '✓ Learned!' : '✓ Mark Learned';
            lb.classList.toggle('on', learned.has(id));
            switchTab('overview');
            document.getElementById('overlay').classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function getTabContent(p, tab) {
            if (tab === 'overview') return `
    <div class="slabel">🧠 Intuition — your friend explaining it</div>
    <div class="explain">${p.intuition}</div>
    <div class="slabel">🎯 When to use this pattern</div>
    <div class="signals-grid">
      <div class="sig-box">
        <div class="sig-box-title">✅ APPLY WHEN</div>
        ${p.distinguish.apply.map(a => `<div class="sig-item"><div class="sig-dot" style="background:var(--green)"></div><div>${a.text}</div></div>`).join('')}
      </div>
      <div class="sig-box">
        <div class="sig-box-title">❌ AVOID WHEN</div>
        ${p.distinguish.avoid.map(a => `<div class="sig-item"><div class="sig-dot" style="background:var(--pink)"></div><div>${a.text}</div></div>`).join('')}
      </div>
    </div>
    <div class="cx-row">
      <div class="cx"><div class="cx-l">Time</div><div class="cx-v">${p.tc}</div></div>
      <div class="cx"><div class="cx-l">Space</div><div class="cx-v">${p.sc}</div></div>
    </div>
    <div class="tip">${p.tip}</div>`;

            if (tab === 'distinguish') return `
    <div class="slabel">🔍 How to distinguish this pattern</div>
    <div class="distinguish">
      <div class="dist-head">RECOGNITION GUIDE</div>
      <div class="dist-body">
        <div class="dist-row"><div class="dist-icon">💬</div><div class="dist-text">${p.distinguish.howToDistinguish}</div></div>
      </div>
    </div>
    <div class="slabel">🔑 Keywords that signal this pattern</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px">
      ${p.distinguish.signals.map(s => `<span style="background:rgba(0,212,138,0.1);border:1px solid rgba(0,212,138,0.25);border-radius:7px;padding:5px 11px;font-size:12px;color:var(--green);font-family:'JetBrains Mono',monospace">${s}</span>`).join('')}
    </div>
    <div class="slabel">🚫 Keywords that suggest a DIFFERENT pattern</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px">
      ${p.distinguish.notSignals.map(s => `<span style="background:rgba(240,62,132,0.08);border:1px solid rgba(240,62,132,0.2);border-radius:7px;padding:5px 11px;font-size:12px;color:var(--pink);font-family:'JetBrains Mono',monospace">${s}</span>`).join('')}
    </div>
    <div class="slabel">✅ Apply when</div>
    ${p.distinguish.apply.map(a => `<div style="display:flex;gap:10px;padding:8px 0;border-bottom:1px solid var(--border2);font-size:13px;line-height:1.6"><span>${a.icon}</span><div>${a.text}</div></div>`).join('')}
    <div style="height:12px"></div>
    <div class="slabel">❌ Don't apply when</div>
    ${p.distinguish.avoid.map(a => `<div style="display:flex;gap:10px;padding:8px 0;border-bottom:1px solid var(--border2);font-size:13px;line-height:1.6"><span>${a.icon}</span><div>${a.text}</div></div>`).join('')}`;

            if (tab === 'visualize') return `
    <div class="slabel">🎬 Step-by-step visualization</div>
    <div class="viz-container" id="vizContainer"><div class="viz-stage"></div></div>
    <div class="explain" style="font-size:13px">Use ▶ Play or step through manually with Prev/Next buttons.</div>`;

            if (tab === 'code') return `
    <div class="slabel">💻 Implementation</div>
    <div class="code-blk">
      <div class="code-hdr"><span class="lang-pill">Python 3</span><span style="font-size:12px;color:var(--muted)">${p.title}</span><button class="copy-btn" onclick="copyCode(${p.id})">copy</button></div>
      <pre>${p.code}</pre>
    </div>
    <div class="cx-row"><div class="cx"><div class="cx-l">Time</div><div class="cx-v">${p.tc}</div></div><div class="cx"><div class="cx-l">Space</div><div class="cx-v">${p.sc}</div></div></div>
    <div class="tip">${p.tip}</div>`;

            if (tab === 'problems') return `
    <div class="slabel">🎮 Practice problems with direct links</div>
    <div class="prob-list">
      ${p.problems.map(pr => `<a class="prob-row" href="${pr.url}" target="_blank" rel="noopener">
        <span class="prob-name">${pr.name}</span>
        <span class="prob-tag">${pr.tag}</span>
        <span class="prob-diff ${pr.diff}">${pr.diff}</span>
        <span class="prob-arrow">→</span>
      </a>`).join('')}
    </div>
    <div style="padding:12px 16px;background:var(--surface);border:1px solid var(--border2);border-radius:9px;font-size:13px;color:var(--muted)">
      🔗 All links go directly to LeetCode problem pages. Free account needed for some.
    </div>`;
            return '';
        }

        function switchTab(tab) {
            activeTab = tab;
            document.querySelectorAll('.tab').forEach(t => { t.classList.toggle('active', t.dataset.tab === tab); });
            const p = PATTERNS[currentId];
            document.getElementById('modalBody').innerHTML = getTabContent(p, tab);
            if (tab === 'visualize') {
                const vc = document.getElementById('vizContainer');
                if (vc && VIZS[p.viz]) VIZS[p.viz](vc);
            }
        }

        // Tab clicks
        document.getElementById('tabsRow').addEventListener('click', e => {
            const tab = e.target.dataset.tab;
            if (tab) switchTab(tab);
        });

        document.getElementById('learnBtn').onclick = () => {
            if (currentId === null) return;
            if (learned.has(currentId)) learned.delete(currentId);
            else learned.add(currentId);
            const lb = document.getElementById('learnBtn');
            lb.textContent = learned.has(currentId) ? '✓ Learned!' : '✓ Mark Learned';
            lb.classList.toggle('on', learned.has(currentId));
            saveProgress();
            renderGrid(activeFilter, document.getElementById('searchBox').value);
        };

        document.getElementById('closeX').onclick = () => {
            document.getElementById('overlay').classList.remove('open');
            document.body.style.overflow = '';
        };
        document.getElementById('overlay').addEventListener('click', e => {
            if (e.target === document.getElementById('overlay')) {
                document.getElementById('overlay').classList.remove('open');
                document.body.style.overflow = '';
            }
        });

        function copyCode(id) {
            const code = PATTERNS[id].code.replace(/<[^>]+>/g, '');
            navigator.clipboard.writeText(code).then(() => {
                document.querySelector('.copy-btn').textContent = 'copied!';
                setTimeout(() => document.querySelector('.copy-btn').textContent = 'copy', 2000);
            });
        }

        document.querySelectorAll('.fbtn').forEach(b => {
            b.onclick = () => {
                document.querySelectorAll('.fbtn').forEach(x => x.classList.remove('active'));
                b.classList.add('active'); activeFilter = b.dataset.f;
                renderGrid(activeFilter, document.getElementById('searchBox').value);
            };
        });
        document.getElementById('searchBox').oninput = e => renderGrid(activeFilter, e.target.value);

        renderGrid(); saveProgress();
