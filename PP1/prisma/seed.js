import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const prisma = new PrismaClient();

export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function main() {
  await prisma.languages.createMany({
    data: [
      { name: "Python" },
      { name: "Cpp" },
      { name: "C" },
      { name: "Java" },
      { name: "JavaScript" },
      { name: "Php" },
      { name: "R" },
      { name: "Ruby" },
      { name: "CSharp" },
      { name: "Rust" },
    ],
  });
  await prisma.tags.createMany({
    data: [
      { name: "Frontend", color: "#E91E63" },
      { name: "Backend", color: "#FF9800" },
      { name: "DevOps", color: "#03A9F4" },
      { name: "API Design", color: "#9C27B0" },
      { name: "Cryptography", color: "#4CAF50" },
      { name: "UI/UX Design", color: "#673AB7" },
      { name: "AI Ethics", color: "#FFC107" },
      { name: "Software Eng", color: "#F44336" },
      { name: "Full Stack", color: "#009688" },
      { name: "React", color: "#2196F3" },
      { name: "Angular", color: "#FF5722" },
      { name: "Vue", color: "#4CAF50" },
      { name: "TypeScript", color: "#007ACC" },
      { name: "Python", color: "#306998" },
      { name: "Java", color: "#F89820" },
      { name: "C++", color: "#00599C" },
      { name: "Rust", color: "#D96459" },
      { name: "Kubernetes", color: "#326CE5" },
      { name: "Docker", color: "#2496ED" },
      { name: "Git", color: "#F1502F" },
      { name: "SQL", color: "#4479A1" },
      { name: "NoSQL", color: "#E53935" },
      { name: "Data Mining", color: "#673AB7" },
      { name: "Big Data", color: "#FFC107" },
      { name: "Microservices", color: "#FF7043" },
      { name: "Serverless", color: "#00BCD4" },
      { name: "IoT", color: "#607D8B" },
      { name: "Ethical Hacking", color: "#4CAF50" },
      { name: "Pen Testing", color: "#FF5722" },
      { name: "Agile", color: "#Ffa32A" },
      { name: "Scrum", color: "#9C27B0" },
      { name: "Kanban", color: "#Ffa32A" },
      { name: "Testing", color: "#FF9800" },
      { name: "CI/CD", color: "#03A9F4" },
      { name: "Cloud", color: "#42A5F5" },
      { name: "AWS", color: "#FF9900" },
      { name: "Azure", color: "#008AD7" },
      { name: "GCP", color: "#4285F4" },
      { name: "Terraform", color: "#623CE4" },
      { name: "Linux", color: "#FCC624" },
      { name: "Shell Script", color: "#4CAF50" },
      { name: "Web3", color: "#F7931A" },
      { name: "Game Dev", color: "#FF5722" },
      { name: "Cybersecurity", color: "#E91E63" },
      { name: "Data Science", color: "#673AB7" },
      { name: "TensorFlow", color: "#FF6F00" },
      { name: "PyTorch", color: "#EE4C2C" },
      { name: "NLP", color: "#009688" },
      { name: "Computer Vision", color: "#F44336" },
      { name: "Deep Learning", color: "#3F51B5" },
      { name: "OpenCV", color: "#5C9BD1" },
      { name: "Firebase", color: "#Ffa32A" },
      { name: "Bootstrap", color: "#7952B3" },
      { name: "Tailwind", color: "#06B6D4" },
      { name: "CSS", color: "#2965F1" },
      { name: "HTML", color: "#E34F26" },
      { name: "JavaScript", color: "#Ffa32A" },
    ],
  });

  function getRandomTagId() {
    return Math.floor(Math.random() * 56) + 1;
  }

  function getRandomNumTags() {
    return Math.floor(Math.random() * 2) + 1;
  }

  function getRandomTagIds() {
    const numTags = getRandomNumTags();
    const tagIds = new Set();
    while (tagIds.size < numTags) {
      tagIds.add(getRandomTagId());
    }
    return [...tagIds];
  }

  await prisma.reports.createMany({
    data: [
      { message: "Innapropriate content" },
      { message: "Physical Violence" },
      { message: "Too Political" },
      { message: "Not LGBTQ+2 Friendly" },
      { message: "Hate Speech" },
      { message: "Harassment" },
      { message: "Spam or Scam" },
      { message: "Misinformation" },
    ],
  });

  const avatarBuffer = Buffer.from("llllllllll", "utf-8");

  // List of 50 first and last names
  const firstNames = [
    "James",
    "Mary",
    "John",
    "Patricia",
    "Robert",
    "Jennifer",
    "Michael",
    "Linda",
    "William",
    "Elizabeth",
    "David",
    "Barbara",
    "Richard",
    "Susan",
    "Joseph",
    "Jessica",
    "Thomas",
    "Sarah",
    "Charles",
    "Karen",
    "Christopher",
    "Nancy",
    "Daniel",
    "Lisa",
    "Matthew",
    "Betty",
    "Anthony",
    "Margaret",
    "Mark",
    "Sandra",
    "Donald",
    "Ashley",
    "Paul",
    "Kimberly",
    "Steven",
    "Emily",
    "Andrew",
    "Donna",
    "Kenneth",
    "Michelle",
    "George",
    "Dorothy",
    "Joshua",
    "Carol",
    "Kevin",
    "Amanda",
    "Brian",
    "Melissa",
    "Edward",
    "Deborah",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Walker",
    "Young",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Torres",
    "Nguyen",
    "Hill",
    "Flores",
    "Green",
    "Adams",
    "Nelson",
    "Baker",
    "Hall",
    "Rivera",
    "Campbell",
    "Mitchell",
    "Carter",
    "Roberts",
  ];

  // Function to get a random name from a list
  const getRandomName = (list) => list[Math.floor(Math.random() * list.length)];

  // Admin accounts
  const admins = [
    {
      firstName: "Lala",
      lastName: "Deviluke",
      role: "ADMIN",
      password: await hashPassword("pokpok"),
      email: "lala@gmail.com",
      phone: "604604604",
      avatar: avatarBuffer,
    },
    {
      firstName: "Admin",
      lastName: "One",
      role: "ADMIN",
      password: await hashPassword("adminpassword1"),
      email: "admin1@gmail.com",
      phone: "5551111111",
      avatar: avatarBuffer,
    },
    {
      firstName: "Admin",
      lastName: "Two",
      role: "ADMIN",
      password: await hashPassword("adminpassword2"),
      email: "admin2@gmail.com",
      phone: "5552222222",
      avatar: avatarBuffer,
    },
  ];

  // Generate 50 user accounts
  const users = [];
  for (let i = 0; i < 50; i++) {
    users.push({
      firstName: getRandomName(firstNames),
      lastName: getRandomName(lastNames),
      role: "USER",
      password: await hashPassword(`userpassword${i + 1}`),
      email: `user${i + 1}@gmail.com`,
      phone: `600${String(i).padStart(7, "0")}`, // Generate unique phone numbers
      avatar: avatarBuffer,
    });
  }

  // Insert into database
  await prisma.users.createMany({
    data: [...admins, ...users],
  });

  function getRandomAuthorId() {
    return Math.floor(Math.random() * 50) + 1;
  }

  const templateData = [
    {
      title: "Two Sum Solution",
      explanation: "This is a solution to the Two Sum problem",
      code: "def two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]",
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Three Sum Solution",
      explanation: "This is a solution to the Two Sum problem",
      code: "class Solution {\npublic:\n  vector<vector<int>> threeSum(vector<int>& nums) {\n    set<vector<int>> res;\n    sort(nums.begin(), nums.end());\n    for (int i = 0; i < nums.size(); i++) {\n      for (int j = i + 1; j < nums.size(); j++) {\n        for (int k = j + 1; k < nums.size(); k++) {\n          if (nums[i] + nums[j] + nums[k] == 0) {\n            res.insert({nums[i], nums[j], nums[k]});\n          }\n        }\n      }\n    }\n    return vector<vector<int>>(res.begin(), res.end());\n  }\n};",
      languageId: 2,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Binary Search",
      explanation: "This is a solution to the Binary Search problem",
      code: "def binary_search(arr, x):\n    l, r = 0, len(arr) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if arr[mid] == x:\n            return mid\n        elif arr[mid] < x:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return -1",
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Merge Sort",
      explanation: "This is a solution to the Merge Sort problem",
      code: "def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        L = arr[:mid]\n        R = arr[mid:]\n        merge_sort(L)\n        merge_sort(R)\n        i = j = k = 0\n        while i < len(L) and j < len(R):\n            if L[i] < R[j]:\n                arr[k] = L[i]\n                i += 1\n            else:\n                arr[k] = R[j]\n                j += 1\n            k += 1\n        while i < len(L):\n            arr[k] = L[i]\n            i += 1\n            k += 1\n        while j < len(R):\n            arr[k] = R[j]\n            j += 1\n            k += 1",
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Quick Sort",
      explanation: "This is a solution to the Quick Sort problem",
      code: "def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)",
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Bubble Sort",
      explanation: "This is a solution to the Bubble Sort problem",
      code: "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]",
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Insertion Sort",
      explanation: "This is a solution to the Insertion Sort problem",
      code: "def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i-1\n        while j >= 0 and key < arr[j]:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key",
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Selection Sort",
      explanation: "This is a solution to the Selection Sort problem",
      code: "def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i+1, len(arr)):\n            if arr[min_idx] > arr[j]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]",
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Heap Sort",
      explanation: "This is a solution to the Heap Sort problem",
      code: "def heapify(arr, n, i):\n    largest = i\n    l = 2 * i + 1\n    r = 2 * i + 2\n    if l < n and arr[i] < arr[l]:\n        largest = l\n    if r < n and arr[largest] < arr[r]:\n        largest = r\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        heapify(arr, n, largest)\n\ndef heap_sort(arr):\n    n = len(arr)\n    for i in range(n//2, -1, -1):\n        heapify(arr, n, i)\n    for i in range(n-1, 0, -1):\n        arr[i], arr[0] = arr[0], arr[i]\n        heapify(arr, i, 0)",
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Counting Sort",
      explanation: "This is a solution to the Counting Sort problem",
      code: "def counting_sort(arr):\n    max_val = max(arr)\n    m = max_val + 1\n    count = [0] * m\n    for a in arr:\n        count[a] += 1\n    i = 0\n    for a in range(m):\n        for c in range(count[a]):\n            arr[i] = a\n            i += 1",
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Radix Sort",
      explanation: "This is a solution to the Radix Sort problem",
      code: "def counting_sort(arr, exp1):\n    n = len(arr)\n    output = [0] * n\n    count = [0] * 10\n    for i in range(n):\n        index = arr[i] // exp1\n        count[index % 10] += 1\n    for i in range(1, 10):\n        count[i] += count[i - 1]\n    i = n - 1\n    while i >= 0:\n        index = arr[i] // exp1\n        output[count[index % 10] - 1] = arr[i]\n        count[index % 10] -= 1\n        i -= 1\n    for i in range(len(arr)):\n        arr[i] = output[i]\n\ndef radix_sort(arr):\n    max1 = max(arr)\n    exp = 1\n    while max1 // exp > 0:\n        counting_sort(arr, exp)\n        exp *= 10",
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Shell Sort",
      explanation: "This is a solution to the Shell Sort problem",
      code: "def shell_sort(arr):\n    n = len(arr)\n    gap = n // 2\n    while gap > 0:\n        for i in range(gap, n):\n            temp = arr[i]\n            j = i\n            while j >= gap and arr[j - gap] > temp:\n                arr[j] = arr[j - gap]\n                j -= gap\n            arr[j] = temp\n        gap //= 2",
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Bubble Sort in C#",
      explanation: "This is a solution to the Bubble Sort problem in C#",
      code: "public void BubbleSort(int[] arr) {\n    int n = arr.Length;\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - i - 1; j++)\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n}",
      languageId: 10,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Quick Sort in C#",
      explanation: "This is a solution to the Quick Sort problem in C#",
      code: "public void QuickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int pi = Partition(arr, low, high);\n        QuickSort(arr, low, pi - 1);\n        QuickSort(arr, pi + 1, high);\n    }\n}\n\nprivate int Partition(int[] arr, int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j <= high - 1; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            int temp = arr[i];\n            arr[i] = arr[j];\n            arr[j] = temp;\n        }\n    }\n    int temp1 = arr[i + 1];\n    arr[i + 1] = arr[high];\n    arr[high] = temp1;\n    return (i + 1);\n}",
      languageId: 10,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Merge Sort in C#",
      explanation: "This is a solution to the Merge Sort problem in C#",
      code: "public void MergeSort(int[] arr, int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        MergeSort(arr, l, m);\n        MergeSort(arr, m + 1, r);\n        Merge(arr, l, m, r);\n    }\n}\n\nprivate void Merge(int[] arr, int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int[] L = new int[n1];\n    int[] R = new int[n2];\n    Array.Copy(arr, l, L, 0, n1);\n    Array.Copy(arr, m + 1, R, 0, n2);\n    int i = 0, j = 0;\n    int k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) {\n            arr[k] = L[i];\n            i++;\n        } else {\n            arr[k] = R[j];\n            j++;\n        }\n        k++;\n    }\n    while (i < n1) {\n        arr[k] = L[i];\n        i++;\n        k++;\n    }\n    while (j < n2) {\n        arr[k] = R[j];\n        j++;\n        k++;\n    }\n}",
      languageId: 10,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Insertion Sort in C#",
      explanation: "This is a solution to the Insertion Sort problem in C#",
      code: "public void InsertionSort(int[] arr) {\n    int n = arr.Length;\n    for (int i = 1; i < n; ++i) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}",
      languageId: 10,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Selection Sort in C#",
      explanation: "This is a solution to the Selection Sort problem in C#",
      code: "public void SelectionSort(int[] arr) {\n    int n = arr.Length;\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++)\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        int temp = arr[min_idx];\n        arr[min_idx] = arr[i];\n        arr[i] = temp;\n    }\n}",
      languageId: 10,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Heap Sort in C#",
      explanation: "This is a solution to the Heap Sort problem in C#",
      code: "public void HeapSort(int[] arr) {\n    int n = arr.Length;\n    for (int i = n / 2 - 1; i >= 0; i--)\n        Heapify(arr, n, i);\n    for (int i = n - 1; i > 0; i--) {\n        int temp = arr[0];\n        arr[0] = arr[i];\n        arr[i] = temp;\n        Heapify(arr, i, 0);\n    }\n}\n\nprivate void Heapify(int[] arr, int n, int i) {\n    int largest = i;\n    int l = 2 * i + 1;\n    int r = 2 * i + 2;\n    if (l < n && arr[l] > arr[largest])\n        largest = l;\n    if (r < n && arr[r] > arr[largest])\n        largest = r;\n    if (largest != i) {\n        int swap = arr[i];\n        arr[i] = arr[largest];\n        arr[largest] = swap;\n        Heapify(arr, n, largest);\n    }\n}",
      languageId: 10,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Shell Sort in C#",
      explanation: "This is a solution to the Shell Sort problem in C#",
      code: "public void ShellSort(int[] arr) {\n    int n = arr.Length;\n    for (int gap = n / 2; gap > 0; gap /= 2) {\n        for (int i = gap; i < n; i += 1) {\n            int temp = arr[i];\n            int j;\n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)\n                arr[j] = arr[j - gap];\n            arr[j] = temp;\n        }\n    }\n}",
      languageId: 10,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Trapping Rain Water",
      explanation: "This is a solution to the Trapping Rain Water problem",
      code: "var trap = function(height) {\n    let left = 0, right = height.length - 1;\n    let leftMax = 0, rightMax = 0;\n    let water = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            height[left] >= leftMax ? (leftMax = height[left]) : (water += leftMax - height[left]);\n            left++;\n        } else {\n            height[right] >= rightMax ? (rightMax = height[right]) : (water += rightMax - height[right]);\n            right--;\n        }\n    }\n    return water;\n};",
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Rotting Oranges",
      explanation: "This is a solution to the Rotting Oranges problem",
      code: "var orangesRotting = function(grid) {\n    let queue = [];\n    let freshOranges = 0;\n    let minutes = 0;\n    for (let r = 0; r < grid.length; r++) {\n        for (let c = 0; c < grid[0].length; c++) {\n            if (grid[r][c] === 2) {\n                queue.push([r, c]);\n            }\n            if (grid[r][c] === 1) {\n                freshOranges++;\n            }\n        }\n    }\n    const directions = [getRandomTagIds(), [-1, 0], getRandomTagIds(), [0, -1]];\n    while (queue.length && freshOranges) {\n        let nextQueue = [];\n        while (queue.length) {\n            const [r, c] = queue.shift();\n            for (const [dr, dc] of directions) {\n                const newRow = r + dr;\n                const newCol = c + dc;\n                if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length && grid[newRow][newCol] === 1) {\n                    grid[newRow][newCol] = 2;\n                    freshOranges--;\n                    nextQueue.push([newRow, newCol]);\n                }\n            }\n        }\n        queue = nextQueue;\n        minutes++;\n    }\n    return freshOranges === 0 ? minutes : -1;\n};",
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Longest Substring Without Repeating Characters",
      explanation:
        "This is a solution to the Longest Substring Without Repeating Characters problem",
      code: "var lengthOfLongestSubstring = function(s) {\n    let map = new Map();\n    let left = 0;\n    let maxLength = 0;\n    for (let right = 0; right < s.length; right++) {\n        if (map.has(s[right])) {\n            left = Math.max(map.get(s[right]) + 1, left);\n        }\n        map.set(s[right], right);\n        maxLength = Math.max(maxLength, right - left + 1);\n    }\n    return maxLength;\n};",
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Median of Two Sorted Arrays",
      explanation:
        "This is a solution to the Median of Two Sorted Arrays problem",
      code: "var findMedianSortedArrays = function(nums1, nums2) {\n    let merged = [];\n    let i = 0, j = 0;\n    while (i < nums1.length && j < nums2.length) {\n        if (nums1[i] < nums2[j]) {\n            merged.push(nums1[i++]);\n        } else {\n            merged.push(nums2[j++]);\n        }\n    }\n    while (i < nums1.length) {\n        merged.push(nums1[i++]);\n    }\n    while (j < nums2.length) {\n        merged.push(nums2[j++]);\n    }\n    let mid = Math.floor(merged.length / 2);\n    if (merged.length % 2 === 0) {\n        return (merged[mid - 1] + merged[mid]) / 2;\n    } else {\n        return merged[mid];\n    }\n};",
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Container With Most Water",
      explanation:
        "This is a solution to the Container With Most Water problem",
      code: "var maxArea = function(height) {\n    let left = 0, right = height.length - 1;\n    let maxArea = 0;\n    while (left < right) {\n        let width = right - left;\n        let minHeight = Math.min(height[left], height[right]);\n        maxArea = Math.max(maxArea, width * minHeight);\n        if (height[left] < height[right]) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n    return maxArea;\n};",
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Longest Palindromic Substring",
      explanation:
        "This is a solution to the Longest Palindromic Substring problem",
      code: "var longestPalindrome = function(s) {\n    let start = 0, end = 0;\n    for (let i = 0; i < s.length; i++) {\n        let len1 = expandAroundCenter(s, i, i);\n        let len2 = expandAroundCenter(s, i, i + 1);\n        let len = Math.max(len1, len2);\n        if (len > end - start) {\n            start = i - Math.floor((len - 1) / 2);\n            end = i + Math.floor(len / 2);\n        }\n    }\n    return s.substring(start, end + 1);\n};\n\nfunction expandAroundCenter(s, left, right) {\n    while (left >= 0 && right < s.length && s[left] === s[right]) {\n        left--;\n        right++;\n    }\n    return right - left - 1;\n}",
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Valid Parentheses",
      explanation: "This is a solution to the Valid Parentheses problem",
      code: "var isValid = function(s) {\n    let stack = [];\n    let map = {\n        '(': ')',\n        '{': '}',\n        '[': ']'\n    };\n    for (let i = 0; i < s.length; i++) {\n        if (map[s[i]]) {\n            stack.push(s[i]);\n        } else {\n            let last = stack.pop();\n            if (s[i] !== map[last]) {\n                return false;\n            }\n        }\n    }\n    return stack.length === 0;\n};",
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Merge Intervals",
      explanation: "This is a solution to the Merge Intervals problem",
      code: "var merge = function(intervals) {\n    if (intervals.length === 0) return intervals;\n    intervals.sort((a, b) => a[0] - b[0]);\n    let result = [intervals[0]];\n    for (let i = 1; i < intervals.length; i++) {\n        let prev = result[result.length - 1];\n        let curr = intervals[i];\n        if (curr[0] <= prev[1]) {\n            prev[1] = Math.max(prev[1], curr[1]);\n        } else {\n            result.push(curr);\n        }\n    }\n    return result;\n};",
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "FizzBuzz in Ruby",
      explanation: "This is a solution to the FizzBuzz problem in Ruby",
      code: "def fizzbuzz(n)\n  (1..n).each do |i|\n    if i % 3 == 0 && i % 5 == 0\n      puts 'FizzBuzz'\n    elsif i % 3 == 0\n      puts 'Fizz'\n    elsif i % 5 == 0\n      puts 'Buzz'\n    else\n      puts i\n    end\n  end\nend",
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Palindrome Checker in Ruby",
      explanation:
        "This is a solution to check if a string is a palindrome in Ruby",
      code: "def palindrome?(str)\n  str == str.reverse\nend",
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Factorial in Ruby",
      explanation:
        "This is a solution to calculate the factorial of a number in Ruby",
      code: "def factorial(n)\n  return 1 if n == 0\n  n * factorial(n - 1)\nend",
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Prime Number Checker in Ruby",
      explanation: "This is a solution to check if a number is prime in Ruby",
      code: "def prime?(n)\n  return false if n <= 1\n  (2..Math.sqrt(n)).each do |i|\n    return false if n % i == 0\n  end\n  true\nend",
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Bubble Sort in Ruby",
      explanation: "This is a solution to the Bubble Sort problem in Ruby",
      code: "def bubble_sort(arr)\n  n = arr.length\n  loop do\n    swapped = false\n    (n-1).times do |i|\n      if arr[i] > arr[i+1]\n        arr[i], arr[i+1] = arr[i+1], arr[i]\n        swapped = true\n      end\n    end\n    break unless swapped\n  end\n  arr\nend",
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Merge Sort in Ruby",
      explanation: "This is a solution to the Merge Sort problem in Ruby",
      code: "def merge_sort(arr)\n  return arr if arr.length <= 1\n  mid = arr.length / 2\n  left = merge_sort(arr[0...mid])\n  right = merge_sort(arr[mid...arr.length])\n  merge(left, right)\nend\n\ndef merge(left, right)\n  sorted = []\n  until left.empty? || right.empty?\n    if left.first <= right.first\n      sorted << left.shift\n    else\n      sorted << right.shift\n    end\n  end\n  sorted + left + right\nend",
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Binary Search in Ruby",
      explanation: "This is a solution to the Binary Search problem in Ruby",
      code: "def binary_search(arr, target)\n  low = 0\n  high = arr.length - 1\n  while low <= high\n    mid = (low + high) / 2\n    if arr[mid] == target\n      return mid\n    elsif arr[mid] < target\n      low = mid + 1\n    else\n      high = mid - 1\n    end\n  end\n  -1\nend",
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Quick Sort in Ruby",
      explanation: "This is a solution to the Quick Sort problem in Ruby",
      code: "def quick_sort(arr)\n  return arr if arr.length <= 1\n  pivot = arr.delete_at(rand(arr.length))\n  left, right = arr.partition { |x| x < pivot }\n  quick_sort(left) + [pivot] + quick_sort(right)\nend",
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "File Copy",
      explanation: "This is a solution to copy a file in C",
      code: '#include <stdio.h>\n#include <stdlib.h>\n\nvoid copyFile(const char *source, const char *destination) {\n    FILE *src = fopen(source, "rb");\n    FILE *dest = fopen(destination, "wb");\n    if (!src || !dest) {\n        perror("File error");\n        exit(EXIT_FAILURE);\n    }\n    char buffer[BUFSIZ];\n    size_t size;\n    while ((size = fread(buffer, 1, BUFSIZ, src))) {\n        fwrite(buffer, 1, size, dest);\n    }\n    fclose(src);\n    fclose(dest);\n}',
      languageId: 3,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Memory Allocation",
      explanation: "This is a solution to dynamically allocate memory in C",
      code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr;\n    int n;\n    printf("Enter number of elements: ");\n    scanf("%d", &n);\n    arr = (int*)malloc(n * sizeof(int));\n    if (arr == NULL) {\n        fprintf(stderr, "Memory allocation failed");\n        return 1;\n    }\n    for (int i = 0; i < n; i++) {\n        arr[i] = i + 1;\n    }\n    for (int i = 0; i < n; i++) {\n        printf("%d ", arr[i]);\n    }\n    free(arr);\n    return 0;\n}',
      languageId: 3,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Process Creation",
      explanation: "This is a solution to create a new process in C",
      code: '#include <stdio.h>\n#include <unistd.h>\n\nint main() {\n    pid_t pid = fork();\n    if (pid == 0) {\n        printf("Child process");\n    } else if (pid > 0) {\n        printf("Parent process");\n    } else {\n        perror("Fork failed");\n        return 1;\n    }\n    return 0;\n}',
      languageId: 3,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Socket Programming",
      explanation: "This is a solution to create a simple TCP server in C",
      code: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <unistd.h>\n#include <arpa/inet.h>\n\nint main() {\n    int server_fd, new_socket;\n    struct sockaddr_in address;\n    int opt = 1;\n    int addrlen = sizeof(address);\n    char buffer[1024] = {0};\n    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {\n        perror("Socket failed");\n        exit(EXIT_FAILURE);\n    }\n    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt, sizeof(opt))) {\n        perror("Setsockopt failed");\n        exit(EXIT_FAILURE);\n    }\n    address.sin_family = AF_INET;\n    address.sin_addr.s_addr = INADDR_ANY;\n    address.sin_port = htons(8080);\n    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {\n        perror("Bind failed");\n        exit(EXIT_FAILURE);\n    }\n    if (listen(server_fd, 3) < 0) {\n        perror("Listen failed");\n        exit(EXIT_FAILURE);\n    }\n    if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen)) < 0) {\n        perror("Accept failed");\n        exit(EXIT_FAILURE);\n    }\n    read(new_socket, buffer, 1024);\n    printf("Message received: %s", buffer);\n    return 0;\n}',
      languageId: 3,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Thread Creation",
      explanation: "This is a solution to create a new thread in C",
      code: '#include <stdio.h>\n#include <stdlib.h>\n#include <pthread.h>\n\nvoid *threadFunc(void *arg) {\n    printf("Thread created");\n    return NULL;\n}\n\nint main() {\n    pthread_t thread;\n    if (pthread_create(&thread, NULL, threadFunc, NULL)) {\n        fprintf(stderr, "Error creating thread");\n        return 1;\n    }\n    if (pthread_join(thread, NULL)) {\n        fprintf(stderr, "Error joining thread");\n        return 2;\n    }\n    return 0;\n}',
      languageId: 3,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "File Reading",
      explanation: "This is a solution to read a file in C",
      code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    FILE *file = fopen("example.txt", "r");\n    if (file == NULL) {\n        perror("File opening failed");\n        return EXIT_FAILURE;\n    }\n    char ch;\n    while ((ch = fgetc(file)) != EOF) {\n        putchar(ch);\n    }\n    fclose(file);\n    return 0;\n}',
      languageId: 3,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Environment Variables",
      explanation: "This is a solution to access environment variables in C",
      code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    char *path = getenv("PATH");\n    if (path != NULL) {\n        printf("PATH: %s\\n", path);\n    } else {\n        printf("PATH not found");\n    }\n    return 0;\n}',
      languageId: 3,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Signal Handling",
      explanation: "This is a solution to handle signals in C",
      code: '#include <stdio.h>\n#include <stdlib.h>\n#include <signal.h>\n\nvoid handleSignal(int signal) {\n    printf("Caught signal %d\\n", signal);\n    exit(1);\n}\n\nint main() {\n    signal(SIGINT, handleSignal);\n    while (1) {\n        printf("Running...\\n");\n        sleep(1);\n    }\n    return 0;\n}',
      languageId: 3,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "ASCII Art Generator",
      explanation: "This template generates ASCII art from a given string",
      code: '#include <iostream>\n#include <string>\n\nvoid generateASCIIArt(const std::string& text) {\n    for (char c : text) {\n        std::cout << std::string(5, c) << std::endl;\n    }\n}\n\nint main() {\n    std::string text = "Hello";\n    generateASCIIArt(text);\n    return 0;\n}',
      languageId: 2,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Random Joke Generator",
      explanation:
        "This template generates a random joke from a predefined list",
      code: '#include <iostream>\n#include <vector>\n#include <cstdlib>\n#include <ctime>\n\nvoid tellJoke() {\n    std::vector<std::string> jokes = {\n        "Why don\'t scientists trust atoms? Because they make up everything!",\n        "Why did the scarecrow win an award? Because he was outstanding in his field!",\n        "Why don\'t skeletons fight each other? They don\'t have the guts."\n    };\n    std::srand(std::time(0));\n    int index = std::rand() % jokes.size();\n    std::cout << jokes[index] << std::endl;\n}\n\nint main() {\n    tellJoke();\n    return 0;\n}',
      languageId: 2,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Fortune Cookie",
      explanation: "This template generates a random fortune message",
      code: '#include <iostream>\n#include <vector>\n#include <cstdlib>\n#include <ctime>\n\nvoid getFortune() {\n    std::vector<std::string> fortunes = {\n        "You will have a great day!",\n        "A surprise is waiting for you.",\n        "You will achieve your goals."\n    };\n    std::srand(std::time(0));\n    int index = std::rand() % fortunes.size();\n    std::cout << fortunes[index] << std::endl;\n}\n\nint main() {\n    getFortune();\n    return 0;\n}',
      languageId: 2,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Magic 8 Ball",
      explanation: "This template simulates a Magic 8 Ball",
      code: '#include <iostream>\n#include <vector>\n#include <cstdlib>\n#include <ctime>\n\nvoid shakeMagic8Ball() {\n    std::vector<std::string> responses = {\n        "Yes",\n        "No",\n        "Maybe",\n        "Ask again later"\n    };\n    std::srand(std::time(0));\n    int index = std::rand() % responses.size();\n    std::cout << responses[index] << std::endl;\n}\n\nint main() {\n    shakeMagic8Ball();\n    return 0;\n}',
      languageId: 2,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Simple Calculator",
      explanation: "This template implements a simple calculator",
      code: "#include <iostream>\n\nvoid calculator() {\n    char op;\n    double num1, num2;\n    std::cout << \"Enter operator (+, -, *, /): \";\n    std::cin >> op;\n    std::cout << \"Enter two operands: \";\n    std::cin >> num1 >> num2;\n    switch(op) {\n        case '+': std::cout << num1 + num2; break;\n        case '-': std::cout << num1 - num2; break;\n        case '*': std::cout << num1 * num2; break;\n        case '/': std::cout << num1 / num2; break;\n        default: std::cout << \"Error! operator is not correct\";\n    }\n}\n\nint main() {\n    calculator();\n    return 0;\n}",
      languageId: 2,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Palindrome Checker",
      explanation: "This template checks if a given string is a palindrome",
      code: '#include <iostream>\n#include <algorithm>\n\nbool isPalindrome(const std::string& str) {\n    std::string reversed = str;\n    std::reverse(reversed.begin(), reversed.end());\n    return str == reversed;\n}\n\nint main() {\n    std::string text = "madam";\n    if (isPalindrome(text)) {\n        std::cout << text << " is a palindrome";\n    } else {\n        std::cout << text << " is not a palindrome";\n    }\n    return 0;\n}',
      languageId: 2,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Number Guesser",
      explanation: "This template implements a number guessing game",
      code: '#include <iostream>\n#include <cstdlib>\n#include <ctime>\n\nvoid numberGuesser() {\n    std::srand(std::time(0));\n    int number = std::rand() % 100 + 1;\n    int guess;\n    std::cout << "Guess a number between 1 and 100: ";\n    do {\n        std::cin >> guess;\n        if (guess > number) {\n            std::cout << "Too high! Try again: ";\n        } else if (guess < number) {\n            std::cout << "Too low! Try again: ";\n        } else {\n            std::cout << "Correct! The number was " << number << std::endl;\n        }\n    } while (guess != number);\n}\n\nint main() {\n    numberGuesser();\n    return 0;\n}',
      languageId: 2,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Simple Chatbot",
      explanation: "This template implements a simple chatbot",
      code: '#include <iostream>\n#include <string>\n\nvoid chatbot() {\n    std::string input;\n    std::cout << "Hello! I am a chatbot. How can I help you today?" << std::endl;\n    while (true) {\n        std::getline(std::cin, input);\n        if (input == "exit") {\n            std::cout << "Goodbye!" << std::endl;\n            break;\n        }\n        std::cout << "You said: " << input << std::endl;\n    }\n}\n\nint main() {\n    chatbot();\n    return 0;\n}',
      languageId: 2,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "FizzBuzz in Java",
      explanation: "This is a solution to the FizzBuzz problem in Java",
      code: 'public class FizzBuzz {\n  public static void main(String[] args) {\n    for (int i = 1; i <= 100; i++) {\n      if (i % 3 == 0 && i % 5 == 0) {\n        System.out.println("FizzBuzz");\n      } else if (i % 3 == 0) {\n        System.out.println("Fizz");\n      } else if (i % 5 == 0) {\n        System.out.println("Buzz");\n      } else {\n        System.out.println(i);\n      }\n    }\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Palindrome Checker in Java",
      explanation:
        "This is a solution to check if a string is a palindrome in Java",
      code: 'public class PalindromeChecker {\n  public static boolean isPalindrome(String str) {\n    int left = 0, right = str.length() - 1;\n    while (left < right) {\n      if (str.charAt(left) != str.charAt(right)) {\n        return false;\n      }\n      left++;\n      right--;\n    }\n    return true;\n  }\n\n  public static void main(String[] args) {\n    String text = "madam";\n    System.out.println(text + " is palindrome: " + isPalindrome(text));\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Factorial in Java",
      explanation:
        "This is a solution to calculate the factorial of a number in Java",
      code: 'public class Factorial {\n  public static int factorial(int n) {\n    if (n == 0) {\n      return 1;\n    }\n    return n * factorial(n - 1);\n  }\n\n  public static void main(String[] args) {\n    int number = 5;\n    System.out.println("Factorial of " + number + " is " + factorial(number));\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Prime Number Checker in Java",
      explanation: "This is a solution to check if a number is prime in Java",
      code: 'public class PrimeChecker {\n  public static boolean isPrime(int n) {\n    if (n <= 1) {\n      return false;\n    }\n    for (int i = 2; i <= Math.sqrt(n); i++) {\n      if (n % i == 0) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  public static void main(String[] args) {\n    int number = 29;\n    System.out.println(number + " is prime: " + isPrime(number));\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Bubble Sort in Java",
      explanation: "This is a solution to the Bubble Sort problem in Java",
      code: 'public class BubbleSort {\n  public static void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n      for (int j = 0; j < n - i - 1; j++) {\n        if (arr[j] > arr[j + 1]) {\n          int temp = arr[j];\n          arr[j] = arr[j + 1];\n          arr[j + 1] = temp;\n        }\n      }\n    }\n  }\n\n  public static void main(String[] args) {\n    int[] arr = {64, 34, 25, 12, 22, 11, 90};\n    bubbleSort(arr);\n    System.out.println("Sorted array: ");\n    for (int i : arr) {\n      System.out.print(i + " ");\n    }\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Merge Sort in Java",
      explanation: "This is a solution to the Merge Sort problem in Java",
      code: 'public class MergeSort {\n  public static void mergeSort(int[] arr, int l, int r) {\n    if (l < r) {\n      int m = (l + r) / 2;\n      mergeSort(arr, l, m);\n      mergeSort(arr, m + 1, r);\n      merge(arr, l, m, r);\n    }\n  }\n\n  public static void merge(int[] arr, int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int[] L = new int[n1];\n    int[] R = new int[n2];\n    for (int i = 0; i < n1; ++i) {\n      L[i] = arr[l + i];\n    }\n    for (int j = 0; j < n2; ++j) {\n      R[j] = arr[m + 1 + j];\n    }\n    int i = 0, j = 0;\n    int k = l;\n    while (i < n1 && j < n2) {\n      if (L[i] <= R[j]) {\n        arr[k] = L[i];\n        i++;\n      } else {\n        arr[k] = R[j];\n        j++;\n      }\n      k++;\n    }\n    while (i < n1) {\n      arr[k] = L[i];\n      i++;\n      k++;\n    }\n    while (j < n2) {\n      arr[k] = R[j];\n      j++;\n      k++;\n    }\n  }\n\n  public static void main(String[] args) {\n    int[] arr = {12, 11, 13, 5, 6, 7};\n    mergeSort(arr, 0, arr.length - 1);\n    System.out.println("Sorted array: ");\n    for (int i : arr) {\n      System.out.print(i + " ");\n    }\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Binary Search in Java",
      explanation: "This is a solution to the Binary Search problem in Java",
      code: 'public class BinarySearch {\n  public static int binarySearch(int[] arr, int x) {\n    int l = 0, r = arr.length - 1;\n    while (l <= r) {\n      int m = l + (r - l) / 2;\n      if (arr[m] == x) {\n        return m;\n      }\n      if (arr[m] < x) {\n        l = m + 1;\n      } else {\n        r = m - 1;\n      }\n    }\n    return -1;\n  }\n\n  public static void main(String[] args) {\n    int[] arr = {2, 3, 4, 10, 40};\n    int x = 10;\n    int result = binarySearch(arr, x);\n    if (result == -1) {\n      System.out.println("Element not present");\n    } else {\n      System.out.println("Element found at index " + result);\n    }\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Quick Sort in Java",
      explanation: "This is a solution to the Quick Sort problem in Java",
      code: 'public class QuickSort {\n  public static void quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n      int pi = partition(arr, low, high);\n      quickSort(arr, low, pi - 1);\n      quickSort(arr, pi + 1, high);\n    }\n  }\n\n  public static int partition(int[] arr, int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j <= high - 1; j++) {\n      if (arr[j] < pivot) {\n        i++;\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n      }\n    }\n    int temp = arr[i + 1];\n    arr[i + 1] = arr[high];\n    arr[high] = temp;\n    return (i + 1);\n  }\n\n  public static void main(String[] args) {\n    int[] arr = {10, 7, 8, 9, 1, 5};\n    quickSort(arr, 0, arr.length - 1);\n    System.out.println("Sorted array: ");\n    for (int i : arr) {\n      System.out.print(i + " ");\n    }\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Linear Regression in R",
      explanation:
        "This template demonstrates how to perform linear regression in R",
      code: "data(mtcars)\nmodel <- lm(mpg ~ wt + hp, data = mtcars)\nsummary(model)",
      languageId: 7,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Data Visualization with ggplot2",
      explanation:
        "This template shows how to create a scatter plot using ggplot2 in R",
      code: "library(ggplot2)\nggplot(mtcars, aes(x = wt, y = mpg)) + geom_point()",
      languageId: 7,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Descriptive Statistics in R",
      explanation: "This template calculates basic descriptive statistics in R",
      code: "data(mtcars)\nsum_stats <- summary(mtcars)\nprint(sum_stats)",
      languageId: 7,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Time Series Analysis in R",
      explanation:
        "This template demonstrates how to perform time series analysis in R",
      code: "data(AirPassengers)\nts_data <- ts(AirPassengers, frequency = 12)\nplot(ts_data)",
      languageId: 7,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Clustering with k-means in R",
      explanation: "This template shows how to perform k-means clustering in R",
      code: "data(iris)\nset.seed(20)\nclusters <- kmeans(iris[, 1:4], centers = 3)\nprint(clusters)",
      languageId: 7,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Principal Component Analysis in R",
      explanation: "This template demonstrates how to perform PCA in R",
      code: "data(iris)\npca <- prcomp(iris[, 1:4], scale. = TRUE)\nsummary(pca)",
      languageId: 7,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Hypothesis Testing in R",
      explanation: "This template shows how to perform a t-test in R",
      code: "data(mtcars)\ntest <- t.test(mpg ~ am, data = mtcars)\nprint(test)",
      languageId: 7,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "ANOVA in R",
      explanation: "This template demonstrates how to perform ANOVA in R",
      code: "data(mtcars)\nmodel <- aov(mpg ~ factor(cyl), data = mtcars)\nsummary(model)",
      languageId: 7,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Hello World in PHP",
      explanation: "This template prints 'Hello World' in PHP",
      code: "<?php echo 'Hello World'; ?>",
      languageId: 6,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Factorial in PHP",
      explanation: "This template calculates the factorial of a number in PHP",
      code: "<?php function factorial($n) { return $n == 0 ? 1 : $n * factorial($n - 1); } echo factorial(5); ?>",
      languageId: 6,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Palindrome Checker in PHP",
      explanation: "This template checks if a string is a palindrome in PHP",
      code: "<?php function isPalindrome($str) { return $str == strrev($str); } echo isPalindrome('madam') ? 'Yes' : 'No'; ?>",
      languageId: 6,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Bubble Sort in PHP",
      explanation: "This template sorts an array using Bubble Sort in PHP",
      code: "<?php function bubbleSort($arr) { $n = count($arr); for ($i = 0; $i < $n-1; $i++) { for ($j = 0; $j < $n-$i-1; $j++) { if ($arr[$j] > $arr[$j+1]) { $temp = $arr[$j]; $arr[$j] = $arr[$j+1]; $arr[$j+1] = $temp; } } } return $arr; } print_r(bubbleSort([64, 34, 25, 12, 22, 11, 90])); ?>",
      languageId: 6,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Prime Number Checker in PHP",
      explanation: "This template checks if a number is prime in PHP",
      code: "<?php function isPrime($n) { if ($n <= 1) return false; for ($i = 2; $i <= sqrt($n); $i++) { if ($n % $i == 0) return false; } return true; } echo isPrime(29) ? 'Yes' : 'No'; ?>",
      languageId: 6,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Fibonacci Sequence in PHP",
      explanation:
        "This template generates the Fibonacci sequence up to a given number in PHP",
      code: "<?php function fibonacci($n) { $fib = getRandomTagIds(); for ($i = 2; $i < $n; $i++) { $fib[$i] = $fib[$i-1] + $fib[$i-2]; } return $fib; } print_r(fibonacci(10)); ?>",
      languageId: 6,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
  ];

  // Shuffle the templateData array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffleArray(templateData);
  for (const template of templateData) {
    await prisma.templates.create({
      data: {
        title: template.title,
        explanation: template.explanation,
        code: template.code,
        languageId: template.languageId,
        authorId: template.authorId,
        tags: {
          connect: template.tags.map((id) => ({ id })),
        },
        isPublic: template.isPublic,
      },
    });
  }

  const getRandomRating = () => {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num * 60 + 45; // mean=45, stddev=60
    return Math.round(Math.abs(num));
  };

  const blogData = [
    {
      title: "How to solve Two Sum",
      authorId: getRandomAuthorId(),
      content: "# Introduction",
      tags: getRandomTagIds(),
      templates: [1],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "How to solve Two Sum",
      authorId: getRandomAuthorId(),
      content: "# Introduction",
      tags: getRandomTagIds(),
      templates: [1],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Understanding Asynchronous JavaScript",
      authorId: getRandomAuthorId(),
      content:
        "# Asynchronous JavaScript\n\nJavaScript is single-threaded, but it handles asynchronous operations using callbacks, promises, and async/await. Here's an example of using `async/await`:\n\n```javascript\nasync function fetchData() {\n  const response = await fetch('https://api.example.com/data');\n  const data = await response.json();\n  return data;\n}\n```",
      tags: getRandomTagIds(),
      templates: [3],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Mastering CSS Flexbox",
      authorId: getRandomAuthorId(),
      content:
        "## CSS Flexbox\n\nFlexbox is a powerful layout mode in CSS. It allows for the alignment and distribution of space among items in a container. Here's how to create a simple flex container:\n\n```css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n```\n\nLearn more about [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).",
      tags: getRandomTagIds(),
      templates: [4],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Getting Started with React Hooks",
      authorId: getRandomAuthorId(),
      content:
        "### React Hooks\n\nHooks are functions that let you use state and other React features without writing a class. Here's an example of using the `useState` hook:\n\n```javascript\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```",
      tags: getRandomTagIds(),
      templates: [5],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Introduction to TypeScript",
      authorId: getRandomAuthorId(),
      content:
        "# TypeScript Basics\n\nTypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. It offers static typing, classes, and interfaces. Here's how to define an interface:\n\n```javascript\ntypescriptinterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n```",
      tags: getRandomTagIds(),
      templates: [6],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Building REST APIs with Node.js",
      authorId: getRandomAuthorId(),
      content:
        "# Building REST APIs\n\nNode.js is a JavaScript runtime built on Chrome's V8 engine. It allows you to build scalable network applications. Here's how to create a simple REST API using Express.js:\n\n```javascript\nconst express = require('express');\nconst app = express();\n\napp.get('/api/data', (req, res) => {\n  res.json({ message: 'Hello, world!' });\n});\n\napp.listen(3000, () => {\n  console.log('Server is running on port 3000');\n});\n```",
      tags: getRandomTagIds(),
      templates: [7],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Introduction to GraphQL",
      authorId: getRandomAuthorId(),
      content:
        "# Introduction to GraphQL\n\nGraphQL is a query language for APIs and a runtime for executing those queries with your existing data. Here's a basic example of a GraphQL schema:\n\n```graphql\ntype Query {\n  books: [Book]\n}\ntype Book {\n  title: String\n  author: String\n}\n```",
      tags: getRandomTagIds(),
      templates: [8],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Understanding Promises in JavaScript",
      authorId: getRandomAuthorId(),
      content:
        "# Understanding Promises\n\nPromises represent the eventual completion or failure of an asynchronous operation. Here's how to use a promise:\n\n```javascript\nconst myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve('Success!');\n  }, 1000);\n});\n\nmyPromise.then((value) => {\n  console.log(value);\n}).catch((error) => {\n  console.error(error);\n});\n```",
      tags: getRandomTagIds(),
      templates: [9],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Styling with CSS Grid",
      authorId: getRandomAuthorId(),
      content:
        "# Styling with CSS Grid\n\nCSS Grid Layout is a two-dimensional grid-based layout system. It allows for the creation of complex layouts with ease. Here's a simple example:\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n```",
      tags: getRandomTagIds(),
      templates: [10],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Deep Dive into Node.js Streams",
      authorId: getRandomAuthorId(),
      content:
        "# Node.js Streams\n\nStreams are a powerful way to handle data in Node.js, allowing for efficient data processing. Here's an example of reading a file using streams:\n\n```javascript\nconst fs = require('fs');\nconst readStream = fs.createReadStream('file.txt', 'utf8');\n\nreadStream.on('data', (chunk) => {\n  console.log('New chunk received:', chunk);\n});\n\nreadStream.on('end', () => {\n  console.log('No more data.');\n});\n```",
      tags: getRandomTagIds(),
      templates: [11],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Getting Started with Next.js",
      authorId: getRandomAuthorId(),
      content:
        "# Introduction to Next.js\n\nNext.js is a React framework that enables server-side rendering and generating static websites for React-based web applications. Here's how to create a simple page in Next.js:\n\n```javascript\nimport React from 'react';\n\nfunction HomePage() {\n  return <h1>Welcome to Next.js!</h1>;\n}\n\nexport default HomePage;\n```",
      tags: getRandomTagIds(),
      templates: [12],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Exploring Python for Data Science",
      authorId: getRandomAuthorId(),
      content:
        "# Python in Data Science\n\nPython is a versatile language widely used in data science for its simplicity and powerful libraries. Here's an example of using Pandas to load and inspect a dataset:\n\n```python\nimport pandas as pd\n\ndata = pd.read_csv('data.csv')\nprint(data.head())\n```",
      tags: getRandomTagIds(),
      templates: [13],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Building Mobile Apps with React Native",
      authorId: getRandomAuthorId(),
      content:
        "# React Native Basics\n\nReact Native allows you to build mobile applications using JavaScript and React. Here's a simple example of a React Native component:\n\n```javascript\nimport React from 'react';\nimport { View, Text, StyleSheet } from 'react-native';\n\nconst App = () => {\n  return (\n    <View style={styles.container}>\n      <Text>Hello, React Native!</Text>\n    </View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'center',\n    alignItems: 'center',\n  },\n});\n\nexport default App;\n```",
      tags: getRandomTagIds(),
      templates: [14],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Getting Started with Docker",
      authorId: getRandomAuthorId(),
      content:
        '# Introduction to Docker\n\nDocker is a platform that allows you to automate the deployment of applications inside lightweight containers. Here\'s how to create a simple Dockerfile:\n\n```dockerfile\nFROM node:14\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nCMD ["node", "app.js"]\n```',
      tags: getRandomTagIds(),
      templates: [15],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Understanding Event Loop in Node.js",
      authorId: getRandomAuthorId(),
      content:
        "# The Event Loop in Node.js\n\nThe event loop is what allows Node.js to perform non-blocking I/O operations. Here's a basic explanation:\n\n```javascript\nconsole.log('Start');\nsetTimeout(() => {\n  console.log('Timeout');\n}, 0);\nPromise.resolve().then(() => {\n  console.log('Promise');\n});\nconsole.log('End');\n```",
      tags: getRandomTagIds(),
      templates: [16],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Building Authentication with JWT",
      authorId: getRandomAuthorId(),
      content:
        "# Authentication using JWT\n\nJSON Web Tokens (JWT) are a compact way to securely transmit information between parties. Here's how to create a JWT in Node.js:\n\n```javascript\nconst jwt = require('jsonwebtoken');\n\nconst token = jwt.sign({ userId: 123 }, 'your-secret-key', { expiresIn: '1h' });\nconsole.log(token);\n```",
      tags: getRandomTagIds(),
      templates: [17],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Optimizing Web Performance",
      authorId: getRandomAuthorId(),
      content:
        "# Web Performance Optimization\n\nImproving the performance of your web applications can enhance user experience. Here are some tips:\n\n- Minimize HTTP requests\n- Use lazy loading for images\n- Compress files using Gzip\n- Implement caching strategies\n",
      tags: getRandomTagIds(),
      templates: [18],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Introduction to Kubernetes",
      authorId: getRandomAuthorId(),
      content:
        "# Kubernetes Basics\n\nKubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. Here's a simple Kubernetes deployment YAML:\n\n```yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.14.2\n        ports:\n        - containerPort: 80\n```",
      tags: getRandomTagIds(),
      templates: [19],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Mastering Git Branching",
      authorId: getRandomAuthorId(),
      content:
        "# Git Branching\n\nBranches in Git allow you to work on different parts of a project simultaneously. Here's how to create and switch branches:\n\n```bash\ngit branch feature/new-feature\ngit checkout feature/new-feature\ngit merge main\ngit push origin feature/new-feature\n```",
      tags: getRandomTagIds(),
      templates: [20],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Exploring Serverless Architecture",
      authorId: getRandomAuthorId(),
      content:
        "# Serverless Computing\n\nServerless architecture allows you to build and run applications without managing servers. Here's an example using AWS Lambda:\n\n```javascript\nexports.handler = async (event) => {\n  return {\n    statusCode: 200,\n    body: JSON.stringify('Hello from Lambda!'),\n  };\n};\n```",
      tags: getRandomTagIds(),
      templates: [21],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Implementing OAuth2 in Applications",
      authorId: getRandomAuthorId(),
      content:
        "# OAuth2 Implementation\n\nOAuth2 is an authorization framework that enables applications to obtain limited access to user accounts. Here's a basic OAuth2 flow:\n\n1. **Authorization Request:** Redirect the user to the authorization server.\n2. **Authorization Grant:** User authenticates and approves the request.\n3. **Access Token Request:** Application requests an access token.\n4. **Access Token Response:** Server returns the access token.\n\n```javascript\n// Example using Passport.js\nconst passport = require('passport');\nconst OAuth2Strategy = require('passport-oauth2');\n\npassport.use(new OAuth2Strategy({\n  authorizationURL: 'https://provider.com/oauth2/authorize',\n  tokenURL: 'https://provider.com/oauth2/token',\n  clientID: 'YOUR_CLIENT_ID',\n  clientSecret: 'YOUR_CLIENT_SECRET',\n  callbackURL: 'https://yourapp.com/callback'\n}, (accessToken, refreshToken, profile, cb) => {\n  User.findOrCreate({ oauthID: profile.id }, (err, user) => {\n    return cb(err, user);\n  });\n}));\n```",
      tags: getRandomTagIds(),
      templates: [22],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Getting Started with Express.js Middleware",
      authorId: getRandomAuthorId(),
      content:
        "# Express.js Middleware\n\nMiddleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. Here's an example of a simple logging middleware:\n\n```javascript\nconst express = require('express');\nconst app = express();\n\n// Logging middleware\nconst logger = (req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next();\n};\n\napp.use(logger);\n\napp.get('/', (req, res) => {\n  res.send('Hello, World!');\n});\n\napp.listen(3000, () => {\n  console.log('Server is running on port 3000');\n});\n```",
      tags: getRandomTagIds(),
      templates: [23],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Building Real-time Applications with Socket.io",
      authorId: getRandomAuthorId(),
      content:
        "# Real-time Applications with Socket.io\n\nSocket.io enables real-time, bidirectional communication between web clients and servers. Here's how to set up a basic chat application using Socket.io:\n\n```javascript\nconst express = require('express');\nconst http = require('http');\nconst socketIo = require('socket.io');\n\nconst app = express();\nconst server = http.createServer(app);\nconst io = socketIo(server);\n\nio.on('connection', (socket) => {\n  console.log('A user connected');\n  \n  socket.on('chat message', (msg) => {\n    io.emit('chat message', msg);\n  });\n  \n  socket.on('disconnect', () => {\n    console.log('User disconnected');\n  });\n});\n\nserver.listen(3000, () => {\n  console.log('Server is running on port 3000');\n});\n```",
      tags: getRandomTagIds(),
      templates: [24],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Mastering Asynchronous JavaScript with Async/Await",
      authorId: getRandomAuthorId(),
      content:
        "# Mastering Async/Await in JavaScript\n\nAsync/Await syntax allows for writing asynchronous code in a more synchronous fashion. Here's an example of fetching data from an API using async/await:\n\n```javascript\nconst fetch = require('node-fetch');\n\nasync function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) {\n      throw new Error('Network response was not ok');\n    }\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('There has been a problem with your fetch operation:', error);\n  }\n}\n\nfetchData('https://api.example.com/data');\n```",
      tags: getRandomTagIds(),
      templates: [25],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Implementing File Uploads in Node.js with Multer",
      authorId: getRandomAuthorId(),
      content:
        "# File Uploads with Multer in Node.js\n\nMulter is a middleware for handling `multipart/form-data`, which is primarily used for uploading files. Here's how to set up file uploads using Multer:\n\n```javascript\nconst express = require('express');\nconst multer  = require('multer');\n\nconst app = express();\nconst upload = multer({ dest: 'uploads/' });\n\n// Single file upload\napp.post('/upload', upload.single('avatar'), (req, res) => {\n  res.send('File uploaded successfully');\n});\n\n// Multiple files upload\napp.post('/upload-multiple', upload.array('photos', 3), (req, res) => {\n  res.send('Multiple files uploaded successfully');\n});\n\napp.listen(3000, () => {\n  console.log('Server is running on port 3000');\n});\n```",
      tags: getRandomTagIds(),
      templates: [26],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Debugging Techniques in JavaScript",
      authorId: getRandomAuthorId(),
      content:
        "# Debugging JavaScript\n\nEffective debugging is crucial for developing robust applications. Here are some techniques:\n\n- **Using console.log:** Insert `console.log` statements to inspect variables.\n- **Debugging with Breakpoints:** Use browser developer tools to set breakpoints and step through code.\n- **Linting Tools:** Utilize tools like ESLint to catch errors early.\n- **Unit Testing:** Write tests to verify code functionality.\n",
      tags: getRandomTagIds(),
      templates: [27],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Version Control with Git",
      authorId: getRandomAuthorId(),
      content:
        '# Getting Started with Git\n\nGit is a distributed version control system that helps track changes in your codebase. Here\'s how to perform basic Git operations:\n\n```bash\ngit init\ngit add .\ngit commit -m "Initial commit"\ngit branch feature/new-feature\ngit checkout feature/new-feature\ngit merge main\ngit push origin feature/new-feature\n```',
      tags: getRandomTagIds(),
      templates: [28],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Introduction to Unit Testing in JavaScript",
      authorId: getRandomAuthorId(),
      content:
        "# Unit Testing with Jest\n\nUnit testing ensures that individual components of your application work as intended. Here's an example using Jest:\n\n```javascript\nconst sum = (a, b) => a + b;\n\ntest('adds 1 + 2 to equal 3', () => {\n  expect(sum(1, 2)).toBe(3);\n});\n```",
      tags: getRandomTagIds(),
      templates: [29],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Optimizing JavaScript Performance",
      authorId: getRandomAuthorId(),
      content:
        "# JavaScript Performance Optimization\n\nImproving the performance of your JavaScript code can enhance user experience. Here are some tips:\n\n- **Minimize Reflows and Repaints:** Optimize DOM manipulations.\n- **Use Efficient Algorithms:** Choose the right data structures and algorithms.\n- **Debounce and Throttle Events:** Control the rate of event handling.\n- **Lazy Loading:** Load resources only when needed.\n",
      tags: getRandomTagIds(),
      templates: [30],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Building Scalable Microservices with Node.js",
      authorId: getRandomAuthorId(),
      content:
        "# Scalable Microservices with Node.js\n\nMicroservices architecture allows you to build scalable and maintainable applications by breaking them down into smaller, independent services. Here's how to create a simple microservice using Express.js:\n\n```javascript\nconst express = require('express');\nconst app = express();\n\napp.get('/service', (req, res) => {\n  res.send('Hello from Microservice!');\n});\n\napp.listen(4000, () => {\n  console.log('Microservice running on port 4000');\n});\n```",
      tags: getRandomTagIds(),
      templates: [31],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Introduction to Functional Programming in JavaScript",
      authorId: getRandomAuthorId(),
      content:
        "# Functional Programming in JavaScript\n\nFunctional programming is a programming paradigm that treats computation as the evaluation of mathematical functions. Here's an example using higher-order functions:\n\n```javascript\nconst numbers = [1, 2, 3, 4, 5];\n\nconst squared = numbers.map(num => num * num);\nconst evenSquares = squared.filter(num => num % 2 === 0);\n\nconsole.log(evenSquares); // [4, 16]\n```",
      tags: getRandomTagIds(),
      templates: [32],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Implementing Caching with Redis in Node.js",
      authorId: getRandomAuthorId(),
      content:
        "# Caching with Redis in Node.js\n\nRedis is an in-memory data store that can be used for caching to improve application performance. Here's how to integrate Redis with a Node.js application:\n\n```javascript\nconst redis = require('redis');\nconst client = redis.createClient();\n\nclient.on('error', (err) => {\n  console.error('Redis error:', err);\n});\n\n// Set a value\nclient.set('key', 'value', redis.print);\n\n// Get a value\nclient.get('key', (err, reply) => {\n  if (err) throw err;\n  console.log(reply); // 'value'\n});\n```",
      tags: getRandomTagIds(),
      templates: [33],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Securing Express.js Applications with Helmet",
      authorId: getRandomAuthorId(),
      content:
        "# Securing Express.js with Helmet\n\nHelmet is a middleware that helps secure Express.js applications by setting various HTTP headers. Here's how to use Helmet in your application:\n\n```javascript\nconst express = require('express');\nconst helmet = require('helmet');\n\nconst app = express();\n\n// Use Helmet middleware\napp.use(helmet());\n\napp.get('/', (req, res) => {\n  res.send('Secure Express.js App');\n});\n\napp.listen(3000, () => {\n  console.log('Server is running on port 3000');\n});\n```",
      tags: getRandomTagIds(),
      templates: [34],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Creating Interactive UIs with Vue.js",
      authorId: getRandomAuthorId(),
      content:
        "# Interactive UIs with Vue.js\n\nVue.js is a progressive JavaScript framework for building user interfaces. Here's a simple example of a Vue component:\n\n```html\n<template>\n  <div id=\"app\">\n    <h1>{{ message }}</h1>\n    <button @click=\"reverseMessage\">Reverse Message</button>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      message: 'Hello Vue!'\n    }\n  },\n  methods: {\n    reverseMessage() {\n      this.message = this.message.split('').reverse().join('')\n    }\n  }\n}\n</script>\n\n<style scoped>\n#app {\n  text-align: center;\n  margin-top: 50px;\n}\n</style>\n```",
      tags: getRandomTagIds(),
      templates: [35],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Exploring WebAssembly with JavaScript",
      authorId: getRandomAuthorId(),
      content:
        "# WebAssembly and JavaScript\n\nWebAssembly allows high-performance applications to run in the browser. Here's how to integrate WebAssembly with JavaScript:\n\n```javascript\nconst go = new Go();\nWebAssembly.instantiateStreaming(fetch('module.wasm'), go.importObject).then((result) => {\n  go.run(result.instance);\n});\n```",
      tags: getRandomTagIds(),
      templates: [36],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Server-Side Rendering with Nuxt.js",
      authorId: getRandomAuthorId(),
      content:
        "# Server-Side Rendering using Nuxt.js\n\nNuxt.js simplifies the development of server-rendered Vue applications. Here's how to create a basic Nuxt.js page:\n\n```javascript\nexport default {\n  async asyncData({ params }) {\n    const data = await fetch(`https://api.example.com/items/${params.id}`)\n      .then(res => res.json())\n    return { item: data }\n  }\n}\n```",
      tags: getRandomTagIds(),
      templates: [37],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Implementing Dark Mode in CSS",
      authorId: getRandomAuthorId(),
      content:
        "# Adding Dark Mode with CSS Variables\n\nDark mode enhances user experience by reducing eye strain. Here's how to implement it using CSS variables:\n\n```css\n:root {\n  --background-color: #ffffff;\n  --text-color: #000000;\n}\n\n[data-theme='dark'] {\n  --background-color: #121212;\n  --text-color: #ffffff;\n}\n\nbody {\n  background-color: var(--background-color);\n  color: var(--text-color);\n}\n```",
      tags: getRandomTagIds(),
      templates: [38],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Building CLI Tools with Node.js",
      authorId: getRandomAuthorId(),
      content:
        "# Creating Command-Line Interfaces with Node.js\n\nNode.js can be used to build powerful CLI tools. Here's an example using the `commander` package:\n\n```javascript\nconst { program } = require('commander');\n\nprogram\n  .version('1.0.0')\n  .description('A simple CLI tool')\n\nprogram\n  .command('greet <name>')\n  .description('Greet a user')\n  .action((name) => {\n    console.log(`Hello, ${name}!`);\n  });\n\nprogram.parse(process.argv);\n```",
      tags: getRandomTagIds(),
      templates: [39],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Managing State with Redux in React",
      authorId: getRandomAuthorId(),
      content:
        "# State Management with Redux\n\nRedux helps manage complex state in React applications. Here's a basic setup:\n\n```javascript\nimport { createStore } from 'redux';\n\n// Action\nconst increment = () => ({ type: 'INCREMENT' });\n\n// Reducer\nconst counter = (state = 0, action) => {\n  switch (action.type) {\n    case 'INCREMENT':\n      return state + 1;\n    default:\n      return state;\n  }\n};\n\n// Store\nconst store = createStore(counter);\n\nstore.subscribe(() => console.log(store.getState()));\n\nstore.dispatch(increment());\n```",
      tags: getRandomTagIds(),
      templates: [40],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Introduction to Graph Databases with Neo4j",
      authorId: getRandomAuthorId(),
      content:
        "# Getting Started with Neo4j Graph Databases\n\nNeo4j is a powerful graph database used for handling connected data. Here's a simple example of creating nodes and relationships:\n\n```cypher\nCREATE (a:Person {name: 'Alice'})\nCREATE (b:Person {name: 'Bob'})\nCREATE (a)-[:FRIENDS_WITH]->(b)\n```",
      tags: getRandomTagIds(),
      templates: [41],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
    {
      title: "Building Static Sites with Gatsby.js",
      authorId: getRandomAuthorId(),
      content:
        "# Creating Static Websites using Gatsby.js\n\nGatsby.js is a React-based framework for building fast static sites. Here's how to set up a basic Gatsby project:\n\n```bash\ngatsby new my-site\ncd my-site\ngatsby develop\n```",
      tags: getRandomTagIds(),
      templates: [42],
      numUpvotes: getRandomRating(),
      numDownvotes: getRandomRating(),
    },
  ];

  shuffleArray(blogData);

  for (const blog of blogData) {
    await prisma.blogs.create({
      data: {
        title: blog.title,
        content: blog.content,
        authorId: blog.authorId,
        tags: {
          connect: blog.tags.map((id) => ({ id })),
        },
        Templates: {
          connect: blog.templates.map((id) => ({ id })),
        },
        numUpvotes: blog.numUpvotes,
        numDownvotes: blog.numDownvotes,
      },
    });
  }
}

// const parentComment = await prisma.comments.create({
//   data: {
//     blogId: 2,
//     userId: 1,
//     content: "Two Sum is a classic problem",
//   },
// });

// await prisma.comments.createMany({
//   data: [
//     {
//       blogId: 2,
//       userId: 1,
//       content: "Two Sum is a classic problem",
//     },
//     {
//       content: "I totally agree haha",
//       userId: 2,
//       blogId: 2,
//     },
//     {
//       content: "Yeah, but have you seen Three Sum?",
//       userId: 3,
//       blogId: 2,
//     },
//     {
//       content: "Cool blog man",
//       userId: 3,
//       blogId: 2,
//     },
//   ],
// });

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
