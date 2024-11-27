import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { get } from "https";

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
      code: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]

if __name__ == "__main__":
    # Example input
    nums = [2, 7, 11, 15]
    target = 9

    # Call the function and print the result
    result = two_sum(nums, target)
    if result:
        print(f"Indices of the two numbers that add up to {target} are: {result}")
    else:
        print(f"No two numbers found in {nums} add up to {target}.")`,
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Three Sum Solution",
      explanation: "This is a solution to the Two Sum problem",
      code: `#include <iostream>
#include <vector>
#include <set>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {
        std::set<std::vector<int>> res;
        std::sort(nums.begin(), nums.end());
        for (size_t i = 0; i < nums.size(); i++) {
            for (size_t j = i + 1; j < nums.size(); j++) {
                for (size_t k = j + 1; k < nums.size(); k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        res.insert({nums[i], nums[j], nums[k]});
                    }
                }
            }
        }
        return std::vector<std::vector<int>>(res.begin(), res.end());
    }
};

int main() {
    std::vector<int> nums = {-1, 0, 1, 2, -1, -4};
    Solution sol;
    auto result = sol.threeSum(nums);

    std::cout << "Triplets that sum to 0 are:\n";
    for (const auto& triplet : result) {
        std::cout << "[" << triplet[0] << ", " << triplet[1] << ", " << triplet[2] << "]\n";
    }

    return 0;
}
`,
      languageId: 2,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Binary Search",
      explanation: "This is a solution to the Binary Search problem",
      code: `def binary_search(arr, x):
    l, r = 0, len(arr) - 1
    while l <= r:
        mid = (l + r) // 2
        if arr[mid] == x:
            return mid
        elif arr[mid] < x:
            l = mid + 1
        else:
            r = mid - 1
    return -1

if __name__ == "__main__":
    arr = [1, 3, 5, 7, 9, 11]
    x = 7
    result = binary_search(arr, x)
    if result != -1:
        print(f"Element {x} found at index {result}")
    else:
        print(f"Element {x} not found in the array")`,
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Merge Sort",
      explanation: "This is a solution to the Merge Sort problem",
      code: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

if __name__ == "__main__":
    arr = [38, 27, 43, 3, 9, 82, 10]
    print("Original array:", arr)
    merge_sort(arr)
    print("Sorted array:", arr)
`,
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Quick Sort",
      explanation: "This is a solution to the Quick Sort problem",
      code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

if __name__ == "__main__":
    arr = [38, 27, 43, 3, 9, 82, 10]
    print("Original array:", arr)
    sorted_arr = quick_sort(arr)
    print("Sorted array:", sorted_arr)
`,
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Bubble Sort",
      explanation: "This is a solution to the Bubble Sort problem",
      code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Original array:", arr)
    bubble_sort(arr)
    print("Sorted array:", arr)`,
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Insertion Sort",
      explanation: "This is a solution to the Insertion Sort problem",
      code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

if __name__ == "__main__":
    arr = [12, 11, 13, 5, 6]
    print("Original array:", arr)
    insertion_sort(arr)
    print("Sorted array:", arr)`,
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Selection Sort",
      explanation: "This is a solution to the Selection Sort problem",
      code: `def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[min_idx] > arr[j]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

if __name__ == "__main__":
    arr = [64, 25, 12, 22, 11]
    print("Original array:", arr)
    selection_sort(arr)
    print("Sorted array:", arr)`,
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Heap Sort",
      explanation: "This is a solution to the Heap Sort problem",
      code: `def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[i] < arr[l]:
        largest = l
    if r < n and arr[largest] < arr[r]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

if __name__ == "__main__":
    arr = [12, 11, 13, 5, 6, 7]
    print("Original array:", arr)
    heap_sort(arr)
    print("Sorted array:", arr)
`,
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Counting Sort",
      explanation: "This is a solution to the Counting Sort problem",
      code: `def counting_sort(arr):
    max_val = max(arr)
    m = max_val + 1
    count = [0] * m
    for a in arr:
        count[a] += 1
    i = 0
    for a in range(m):
        for c in range(count[a]):
            arr[i] = a
            i += 1

if __name__ == "__main__":
    arr = [4, 2, 2, 8, 3, 3, 1]
    print("Original array:", arr)
    counting_sort(arr)
    print("Sorted array:", arr)
`,
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Radix Sort",
      explanation: "This is a solution to the Radix Sort problem",
      code: `def counting_sort(arr, exp1):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for i in range(n):
        index = arr[i] // exp1
        count[index % 10] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    i = n - 1
    while i >= 0:
        index = arr[i] // exp1
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1
    for i in range(len(arr)):
        arr[i] = output[i]

def radix_sort(arr):
    max1 = max(arr)
    exp = 1
    while max1 // exp > 0:
        counting_sort(arr, exp)
        exp *= 10

if __name__ == "__main__":
    arr = [170, 45, 75, 90, 802, 24, 2, 66]
    print("Original array:", arr)
    radix_sort(arr)
    print("Sorted array:", arr)
`,
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Shell Sort",
      explanation: "This is a solution to the Shell Sort problem",
      code: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2

if __name__ == "__main__":
    arr = [12, 34, 54, 2, 3]
    print("Original array:", arr)
    shell_sort(arr)
    print("Sorted array:", arr)
`,
      languageId: 1,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Bubble Sort in C#",
      explanation: "This is a solution to the Bubble Sort problem in C#",
      code: `using System;

int[] arr = { 64, 34, 25, 12, 22, 11, 90 };

void BubbleSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

Console.WriteLine("Original array: " + string.Join(", ", arr));
BubbleSort(arr);
Console.WriteLine("Sorted array: " + string.Join(", ", arr));
`,
      languageId: 9,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Quick Sort in C#",
      explanation: "This is a solution to the Quick Sort problem in C#",
      code: `using System;

public static void QuickSort(int[] arr, int low, int high)
{
    if (low < high)
    {
        int pi = Partition(arr, low, high);
        QuickSort(arr, low, pi - 1);
        QuickSort(arr, pi + 1, high);
    }
}

private static int Partition(int[] arr, int low, int high)
{
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++)
    {
        if (arr[j] < pivot)
        {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp1 = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp1;
    return i + 1;
}

// Example usage:
int[] arr = { 10, 7, 8, 9, 1, 5 };
Console.WriteLine("Original array: " + string.Join(", ", arr));
QuickSort(arr, 0, arr.Length - 1);
Console.WriteLine("Sorted array: " + string.Join(", ", arr));
`,
      languageId: 9,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Merge Sort in C#",
      explanation: "This is a solution to the Merge Sort problem in C#",
      code: `using System;

public static void MergeSort(int[] arr, int l, int r)
{
    if (l < r)
    {
        int m = l + (r - l) / 2;
        MergeSort(arr, l, m);
        MergeSort(arr, m + 1, r);
        Merge(arr, l, m, r);
    }
}

private static void Merge(int[] arr, int l, int m, int r)
{
    int n1 = m - l + 1;
    int n2 = r - m;
    int[] L = new int[n1];
    int[] R = new int[n2];
    Array.Copy(arr, l, L, 0, n1);
    Array.Copy(arr, m + 1, R, 0, n2);
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            arr[k] = L[i];
            i++;
        }
        else
        {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1)
    {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2)
    {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// Example usage:
int[] arr = { 38, 27, 43, 3, 9, 82, 10 };
Console.WriteLine("Original array: " + string.Join(", ", arr));
MergeSort(arr, 0, arr.Length - 1);
Console.WriteLine("Sorted array: " + string.Join(", ", arr));
`,
      languageId: 9,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Insertion Sort in C#",
      explanation: "This is a solution to the Insertion Sort problem in C#",
      code: `using System;

public static void InsertionSort(int[] arr)
{
    for (int i = 1; i < arr.Length; ++i)
    {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

// Example usage:
int[] arr = { 12, 11, 13, 5, 6 };
Console.WriteLine("Original array: " + string.Join(", ", arr));
InsertionSort(arr);
Console.WriteLine("Sorted array: " + string.Join(", ", arr));
`,
      languageId: 9,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Selection Sort in C#",
      explanation: "This is a solution to the Selection Sort problem in C#",
      code: `using System;

public static void SelectionSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++)
    {
        int min_idx = i;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}

// Example usage:
int[] arr = { 64, 25, 12, 22, 11 };
Console.WriteLine("Original array: " + string.Join(", ", arr));
SelectionSort(arr);
Console.WriteLine("Sorted array: " + string.Join(", ", arr));
`,
      languageId: 9,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Heap Sort in C#",
      explanation: "This is a solution to the Heap Sort problem in C#",
      code: `using System;

public static void HeapSort(int[] arr)
{
    int n = arr.Length;
    for (int i = n / 2 - 1; i >= 0; i--)
    {
        Heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--)
    {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        Heapify(arr, i, 0);
    }
}

private static void Heapify(int[] arr, int n, int i)
{
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest])
        largest = l;
    if (r < n && arr[r] > arr[largest])
        largest = r;
    if (largest != i)
    {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        Heapify(arr, n, largest);
    }
}

// Example usage:
int[] arr = { 12, 11, 13, 5, 6, 7 };
Console.WriteLine("Original array: " + string.Join(", ", arr));
HeapSort(arr);
Console.WriteLine("Sorted array: " + string.Join(", ", arr));
`,
      languageId: 9,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Trapping Rain Water",
      explanation: "This is a solution to the Trapping Rain Water problem",
      code: `var trap = function(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            height[left] >= leftMax ? (leftMax = height[left]) : (water += leftMax - height[left]);
            left++;
        } else {
            height[right] >= rightMax ? (rightMax = height[right]) : (water += rightMax - height[right]);
            right--;
        }
    }
    return water;
};

// Example usage:
let heights = [0,1,0,2,1,0,1,3,2,1,2,1];
console.log("Trapped water:", trap(heights));  // Output: 6
`,
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Rotting Oranges",
      explanation: "This is a solution to the Rotting Oranges problem",
      code: `var orangesRotting = function(grid) {
    let queue = [];
    let freshOranges = 0;
    let minutes = 0;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c]);
            }
            if (grid[r][c] === 1) {
                freshOranges++;
            }
        }
    }
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    while (queue.length && freshOranges) {
        let nextQueue = [];
        while (queue.length) {
            const [r, c] = queue.shift();
            for (const [dr, dc] of directions) {
                const newRow = r + dr;
                const newCol = c + dc;
                if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length && grid[newRow][newCol] === 1) {
                    grid[newRow][newCol] = 2;
                    freshOranges--;
                    nextQueue.push([newRow, newCol]);
                }
            }
        }
        queue = nextQueue;
        minutes++;
    }
    return freshOranges === 0 ? minutes : -1;
};

// Example usage:
let grid = [[2,1,1],[1,1,0],[0,1,1]];
console.log("Minutes to rot all oranges:", orangesRotting(grid));  // Output: 4
`,
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Longest Substring Without Repeating Characters",
      explanation:
        "This is a solution to the Longest Substring Without Repeating Characters problem",
      code: `var lengthOfLongestSubstring = function(s) {
    let map = new Map();
    let left = 0;
    let maxLength = 0;
    for (let right = 0; right < s.length; right++) {
        if (map.has(s[right])) {
            left = Math.max(map.get(s[right]) + 1, left);
        }
        map.set(s[right], right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
};

// Example usage:
let str = "abcabcbb";
console.log("Longest substring length:", lengthOfLongestSubstring(str));  // Output: 3
`,
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Median of Two Sorted Arrays",
      explanation:
        "This is a solution to the Median of Two Sorted Arrays problem",
      code: `var findMedianSortedArrays = function(nums1, nums2) {
    let merged = [];
    let i = 0, j = 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] < nums2[j]) {
            merged.push(nums1[i++]);
        } else {
            merged.push(nums2[j++]);
        }
    }
    while (i < nums1.length) {
        merged.push(nums1[i++]);
    }
    while (j < nums2.length) {
        merged.push(nums2[j++]);
    }
    let mid = Math.floor(merged.length / 2);
    if (merged.length % 2 === 0) {
        return (merged[mid - 1] + merged[mid]) / 2;
    } else {
        return merged[mid];
    }
};

// Example usage:
let nums1 = [1, 3];
let nums2 = [2];
console.log("Median of two sorted arrays:", findMedianSortedArrays(nums1, nums2));  // Output: 2
`,
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Container With Most Water",
      explanation:
        "This is a solution to the Container With Most Water problem",
      code: `var maxArea = function(height) {
    let left = 0, right = height.length - 1;
    let maxArea = 0;
    while (left < right) {
        let width = right - left;
        let minHeight = Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, width * minHeight);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
};

// Example usage:
let height = [1,8,6,2,5,4,8,3,7];
console.log("Maximum area:", maxArea(height));  // Output: 49
`,
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Longest Palindromic Substring",
      explanation:
        "This is a solution to the Longest Palindromic Substring problem",
      code: `var longestPalindrome = function(s) {
    let start = 0, end = 0;
    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(s, i, i);
        let len2 = expandAroundCenter(s, i, i + 1);
        let len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    return s.substring(start, end + 1);
};

function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

// Example usage:
let s = "babad";
console.log("Longest palindromic substring:", longestPalindrome(s));  // Output: "bab" or "aba"
`,
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Valid Parentheses",
      explanation: "This is a solution to the Valid Parentheses problem",
      code: `var isValid = function(s) {
    let stack = [];
    let map = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    for (let i = 0; i < s.length; i++) {
        if (map[s[i]]) {
            stack.push(s[i]);
        } else {
            let last = stack.pop();
            if (s[i] !== map[last]) {
                return false;
            }
        }
    }
    return stack.length === 0;
};

// Example usage:
let s = "()[]{}";
console.log("Are the parentheses valid?", isValid(s));  // Output: true
`,
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Merge Intervals",
      explanation: "This is a solution to the Merge Intervals problem",
      code: `var merge = function(intervals) {
    if (intervals.length === 0) return intervals;
    intervals.sort((a, b) => a[0] - b[0]);
    let result = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        let prev = result[result.length - 1];
        let curr = intervals[i];
        if (curr[0] <= prev[1]) {
            prev[1] = Math.max(prev[1], curr[1]);
        } else {
            result.push(curr);
        }
    }
    return result;
};

// Example usage:
let intervals = [[1,3],[2,6],[8,10],[15,18]];
console.log("Merged intervals:", merge(intervals));  // Output: [[1, 6], [8, 10], [15, 18]]
`,
      languageId: 5,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "FizzBuzz in Ruby",
      explanation: "This is a solution to the FizzBuzz problem in Ruby",
      code: `def fizzbuzz(n)
  (1..n).each do |i|
    if i % 3 == 0 && i % 5 == 0
      puts 'FizzBuzz'
    elsif i % 3 == 0
      puts 'Fizz'
    elsif i % 5 == 0
      puts 'Buzz'
    else
      puts i
    end
  end
end

# Example Output
fizzbuzz(15)`,
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Palindrome Checker in Ruby",
      explanation:
        "This is a solution to check if a string is a palindrome in Ruby",
      code: `def palindrome?(str)
  str == str.reverse
end

# Example Output
puts palindrome?('racecar')  # Output: true
puts palindrome?('hello')    # Output: false`,
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Factorial in Ruby",
      explanation:
        "This is a solution to calculate the factorial of a number in Ruby",
      code: `def factorial(n)
  return 1 if n == 0
  n * factorial(n - 1)
end

# Example Output
puts factorial(5)  # Output: 120
puts factorial(0)  # Output: 1`,
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Prime Number Checker in Ruby",
      explanation: "This is a solution to check if a number is prime in Ruby",
      code: `def prime?(n)
  return false if n <= 1
  (2..Math.sqrt(n)).each do |i|
    return false if n % i == 0
  end
  true
end

# Example Output
puts prime?(7)   # Output: true
puts prime?(10)  # Output: false`,
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Bubble Sort in Ruby",
      explanation: "This is a solution to the Bubble Sort problem in Ruby",
      code: `def bubble_sort(arr)
  n = arr.length
  loop do
    swapped = false
    (n-1).times do |i|
      if arr[i] > arr[i+1]
        arr[i], arr[i+1] = arr[i+1], arr[i]
        swapped = true
      end
    end
    break unless swapped
  end
  arr
end

# Example Output
arr = [5, 3, 8, 4, 2]
puts bubble_sort(arr).inspect
# Output: [2, 3, 4, 5, 8]
`,
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Merge Sort in Ruby",
      explanation: "This is a solution to the Merge Sort problem in Ruby",
      code: `def merge_sort(arr)
  return arr if arr.length <= 1
  mid = arr.length / 2
  left = merge_sort(arr[0...mid])
  right = merge_sort(arr[mid...arr.length])
  merge(left, right)
end

def merge(left, right)
  sorted = []
  until left.empty? || right.empty?
    if left.first <= right.first
      sorted << left.shift
    else
      sorted << right.shift
    end
  end
  sorted + left + right
end

# Example Output
arr = [5, 3, 8, 4, 2]
puts merge_sort(arr).inspect
# Output: [2, 3, 4, 5, 8]
`,
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Binary Search in Ruby",
      explanation: "This is a solution to the Binary Search problem in Ruby",
      code: `def binary_search(arr, target)
  low = 0
  high = arr.length - 1
  while low <= high
    mid = (low + high) / 2
    if arr[mid] == target
      return mid
    elsif arr[mid] < target
      low = mid + 1
    else
      high = mid - 1
    end
  end
  -1
end

# Example Output
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
puts binary_search(arr, 5)  # Output: 4
puts binary_search(arr, 10) # Output: -1
`,
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Quick Sort in Ruby",
      explanation: "This is a solution to the Quick Sort problem in Ruby",
      code: `def quick_sort(arr)
  return arr if arr.length <= 1
  pivot = arr.delete_at(rand(arr.length))
  left, right = arr.partition { |x| x < pivot }
  quick_sort(left) + [pivot] + quick_sort(right)
end

# Example Output
arr = [5, 3, 8, 4, 2]
puts quick_sort(arr).inspect
# Output: [2, 3, 4, 5, 8]
`,
      languageId: 8,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Memory Allocation",
      explanation: "This is a solution to dynamically allocate memory in C",
      code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr;\n    int n;\n    printf("Enter number of elements: ");\n    scanf("%d", &n);\n    arr = (int*)malloc(n * sizeof(int));\n    if (arr == NULL) {\n        fprintf(stderr, "Memory allocation failed");\n        return 1;\n    }\n    for (int i = 0; i < n; i++) {\n        arr[i] = i + 1;\n    }\n    for (int i = 0; i < n; i++) {\n        printf("%d ", arr[i]);\n    }\n    free(arr);\n    return 0;\n}',
      stdin: "14",
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
      title: "Thread Creation",
      explanation: "This is a solution to create a new thread in C",
      code: '#include <stdio.h>\n#include <stdlib.h>\n#include <pthread.h>\n\nvoid *threadFunc(void *arg) {\n    printf("Thread created");\n    return NULL;\n}\n\nint main() {\n    pthread_t thread;\n    if (pthread_create(&thread, NULL, threadFunc, NULL)) {\n        fprintf(stderr, "Error creating thread");\n        return 1;\n    }\n    if (pthread_join(thread, NULL)) {\n        fprintf(stderr, "Error joining thread");\n        return 2;\n    }\n    return 0;\n}',
      languageId: 3,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Unsafe printing with an uninitialized pointer",
      explanation: "This is an example of unsafe printing in C",
      code: `#include <stdio.h>

int main() {
    int *ptr;
    
    // Unsafe printing with an uninitialized pointer
    printf("Value: %d", *ptr); 
    
    return 0;
}
`,
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
      stdin: "+\n14\n90",
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
      title: "FizzBuzz in Java",
      explanation: "This is a solution to the FizzBuzz problem in Java",
      code: 'class FizzBuzz {\n  public static void main(String[] args) {\n    for (int i = 1; i <= 100; i++) {\n      if (i % 3 == 0 && i % 5 == 0) {\n        System.out.println("FizzBuzz");\n      } else if (i % 3 == 0) {\n        System.out.println("Fizz");\n      } else if (i % 5 == 0) {\n        System.out.println("Buzz");\n      } else {\n        System.out.println(i);\n      }\n    }\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Palindrome Checker in Java",
      explanation:
        "This is a solution to check if a string is a palindrome in Java",
      code: 'class PalindromeChecker {\n  public static boolean isPalindrome(String str) {\n    int left = 0, right = str.length() - 1;\n    while (left < right) {\n      if (str.charAt(left) != str.charAt(right)) {\n        return false;\n      }\n      left++;\n      right--;\n    }\n    return true;\n  }\n\n  public static void main(String[] args) {\n    String text = "madam";\n    System.out.println(text + " is palindrome: " + isPalindrome(text));\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Factorial in Java",
      explanation:
        "This is a solution to calculate the factorial of a number in Java",
      code: 'class Factorial {\n  public static int factorial(int n) {\n    if (n == 0) {\n      return 1;\n    }\n    return n * factorial(n - 1);\n  }\n\n  public static void main(String[] args) {\n    int number = 5;\n    System.out.println("Factorial of " + number + " is " + factorial(number));\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Prime Number Checker in Java",
      explanation: "This is a solution to check if a number is prime in Java",
      code: 'class PrimeChecker {\n  public static boolean isPrime(int n) {\n    if (n <= 1) {\n      return false;\n    }\n    for (int i = 2; i <= Math.sqrt(n); i++) {\n      if (n % i == 0) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  public static void main(String[] args) {\n    int number = 29;\n    System.out.println(number + " is prime: " + isPrime(number));\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Bubble Sort in Java",
      explanation: "This is a solution to the Bubble Sort problem in Java",
      code: 'class BubbleSort {\n  public static void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n      for (int j = 0; j < n - i - 1; j++) {\n        if (arr[j] > arr[j + 1]) {\n          int temp = arr[j];\n          arr[j] = arr[j + 1];\n          arr[j + 1] = temp;\n        }\n      }\n    }\n  }\n\n  public static void main(String[] args) {\n    int[] arr = {64, 34, 25, 12, 22, 11, 90};\n    bubbleSort(arr);\n    System.out.println("Sorted array: ");\n    for (int i : arr) {\n      System.out.print(i + " ");\n    }\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Merge Sort in Java",
      explanation: "This is a solution to the Merge Sort problem in Java",
      code: 'class MergeSort {\n  public static void mergeSort(int[] arr, int l, int r) {\n    if (l < r) {\n      int m = (l + r) / 2;\n      mergeSort(arr, l, m);\n      mergeSort(arr, m + 1, r);\n      merge(arr, l, m, r);\n    }\n  }\n\n  public static void merge(int[] arr, int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int[] L = new int[n1];\n    int[] R = new int[n2];\n    for (int i = 0; i < n1; ++i) {\n      L[i] = arr[l + i];\n    }\n    for (int j = 0; j < n2; ++j) {\n      R[j] = arr[m + 1 + j];\n    }\n    int i = 0, j = 0;\n    int k = l;\n    while (i < n1 && j < n2) {\n      if (L[i] <= R[j]) {\n        arr[k] = L[i];\n        i++;\n      } else {\n        arr[k] = R[j];\n        j++;\n      }\n      k++;\n    }\n    while (i < n1) {\n      arr[k] = L[i];\n      i++;\n      k++;\n    }\n    while (j < n2) {\n      arr[k] = R[j];\n      j++;\n      k++;\n    }\n  }\n\n  public static void main(String[] args) {\n    int[] arr = {12, 11, 13, 5, 6, 7};\n    mergeSort(arr, 0, arr.length - 1);\n    System.out.println("Sorted array: ");\n    for (int i : arr) {\n      System.out.print(i + " ");\n    }\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Binary Search in Java",
      explanation: "This is a solution to the Binary Search problem in Java",
      code: 'class BinarySearch {\n  public static int binarySearch(int[] arr, int x) {\n    int l = 0, r = arr.length - 1;\n    while (l <= r) {\n      int m = l + (r - l) / 2;\n      if (arr[m] == x) {\n        return m;\n      }\n      if (arr[m] < x) {\n        l = m + 1;\n      } else {\n        r = m - 1;\n      }\n    }\n    return -1;\n  }\n\n  public static void main(String[] args) {\n    int[] arr = {2, 3, 4, 10, 40};\n    int x = 10;\n    int result = binarySearch(arr, x);\n    if (result == -1) {\n      System.out.println("Element not present");\n    } else {\n      System.out.println("Element found at index " + result);\n    }\n  }\n}',
      languageId: 4,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Quick Sort in Java",
      explanation: "This is a solution to the Quick Sort problem in Java",
      code: 'class QuickSort {\n  public static void quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n      int pi = partition(arr, low, high);\n      quickSort(arr, low, pi - 1);\n      quickSort(arr, pi + 1, high);\n    }\n  }\n\n  public static int partition(int[] arr, int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j <= high - 1; j++) {\n      if (arr[j] < pivot) {\n        i++;\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n      }\n    }\n    int temp = arr[i + 1];\n    arr[i + 1] = arr[high];\n    arr[high] = temp;\n    return (i + 1);\n  }\n\n  public static void main(String[] args) {\n    int[] arr = {10, 7, 8, 9, 1, 5};\n    quickSort(arr, 0, arr.length - 1);\n    System.out.println("Sorted array: ");\n    for (int i : arr) {\n      System.out.print(i + " ");\n    }\n  }\n}',
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
      title: "Descriptive Statistics in R",
      explanation: "This template calculates basic descriptive statistics in R",
      code: "data(mtcars)\nsum_stats <- summary(mtcars)\nprint(sum_stats)",
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
      code: `<?php 
// Factorial in PHP
function factorial($n) { 
    return $n == 0 ? 1 : $n * factorial($n - 1); 
} 
echo factorial(5); 
?>
`,
      languageId: 6,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Palindrome Checker in PHP",
      explanation: "This template checks if a string is a palindrome in PHP",
      code: `<?php 
// Palindrome Checker in PHP
function isPalindrome($str) { 
    return $str == strrev($str); 
} 
echo isPalindrome('madam') ? 'Yes' : 'No'; 
?>
`,
      languageId: 6,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Bubble Sort in PHP",
      explanation: "This template sorts an array using Bubble Sort in PHP",
      code: `<?php 
// Bubble Sort in PHP
function bubbleSort($arr) { 
    $n = count($arr); 
    for ($i = 0; $i < $n - 1; $i++) { 
        for ($j = 0; $j < $n - $i - 1; $j++) { 
            if ($arr[$j] > $arr[$j + 1]) { 
                $temp = $arr[$j]; 
                $arr[$j] = $arr[$j + 1]; 
                $arr[$j + 1] = $temp; 
            } 
        } 
    } 
    return $arr; 
} 
print_r(bubbleSort([64, 34, 25, 12, 22, 11, 90])); 
?>
`,
      languageId: 6,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Prime Number Checker in PHP",
      explanation: "This template checks if a number is prime in PHP",
      code: `<?php 
// Prime Number Checker in PHP
function isPrime($n) { 
    if ($n <= 1) return false; 
    for ($i = 2; $i <= sqrt($n); $i++) { 
        if ($n % $i == 0) return false; 
    } 
    return true; 
} 
echo isPrime(29) ? 'Yes' : 'No'; 
?>
`,
      languageId: 6,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Prime Number Checker in Rust",
      explanation: "This template checks if a number is prime in Rust",
      code: `fn is_prime(n: u32) -> bool {
        if n <= 1 {
            return false;
        }
        for i in 2..=((n as f64).sqrt() as u32) {
            if n % i == 0 {
                return false;
            }
        }
        true
    }
    
    fn main() {
        let num = 29;
        println!("{}", if is_prime(num) { "Yes" } else { "No" });
    }`,
      languageId: 10,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Factorial in Rust",
      explanation: "This template calculates the factorial of a number in Rust",
      code: `fn factorial(n: u32) -> u32 {
        if n == 0 {
            1
        } else {
            n * factorial(n - 1)
        }
    }
    
    fn main() {
        let num = 5;
        println!("{}", factorial(num));
    }`,
      languageId: 10,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Palindrome Checker in Rust",
      explanation: "This template checks if a string is a palindrome in Rust",
      code: `fn is_palindrome(s: &str) -> bool {
        let reversed: String = s.chars().rev().collect();
        s == reversed
    }
    
    fn main() {
        let word = "madam";
        println!("{}", if is_palindrome(word) { "Yes" } else { "No" });
    }`,
      languageId: 10,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Bubble Sort in Rust",
      explanation: "This template sorts an array using Bubble Sort in Rust",
      code: `fn bubble_sort(mut arr: Vec<i32>) -> Vec<i32> {
        let n = arr.len();
        for _ in 0..n {
            for j in 0..n-1 {
                if arr[j] > arr[j+1] {
                    arr.swap(j, j+1);
                }
            }
        }
        arr
    }
    
    fn main() {
        let arr = vec![64, 34, 25, 12, 22, 11, 90];
        let sorted = bubble_sort(arr);
        println!("{:?}", sorted);
    }`,
      languageId: 10,
      authorId: getRandomAuthorId(),
      tags: getRandomTagIds(),
      isPublic: true,
    },
    {
      title: "Fibonacci in Rust",
      explanation: "This template calculates the nth Fibonacci number in Rust",
      code: `fn fibonacci(n: u32) -> u32 {
        if n == 0 {
            0
        } else if n == 1 {
            1
        } else {
            fibonacci(n - 1) + fibonacci(n - 2)
        }
    }
    
    fn main() {
        let num = 10;
        println!("{}", fibonacci(num));
    }`,
      languageId: 10,
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
        stdin: template.stdin,
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
  const getRandomBlogId = () =>
    Math.floor(Math.random() * (blogData.length - 1)) + 1;

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

  const getRandomNumComments = () => Math.floor(Math.random() * 10) + 1;
  const randomComments = [
    "Great post! Thanks for sharing.",
    "I found this very helpful.",
    "Nice explanation. Keep up the good work!",
    "This is awesome!",
    "I have a question. Can you provide more details?",
    "I'm looking forward to your next post.",
    "I learned something new today. Thanks!",
    "This is very informative. Well done!",
    "I appreciate the effort you put into this.",
    "I have bookmarked this for future reference.",
  ];

  const commentData = [];
  for (let i = 1; i <= blogData.length; i++) {
    for (let j = 1; j <= getRandomNumComments(); j++) {
      commentData.push({
        blogId: i,
        userId: Math.floor(Math.random() * (users.length - 1)) + 1,
        content:
          randomComments[Math.floor(Math.random() * randomComments.length)],
        numUpvotes: getRandomRating(),
        numDownvotes: getRandomRating(),
      });
    }
  }

  await prisma.comments.createMany({
    data: commentData,
  });

  const randomReplies = [
    "Thank you for your kind words!",
    "I'm glad you found it helpful.",
    "I appreciate your feedback.",
    "Feel free to ask any questions.",
    "Stay tuned for more posts!",
    "I'm happy to hear that you learned something new.",
    "You're welcome!",
    "I'm glad you enjoyed it.",
    "I'm here to help!",
    "I hope you find it useful.",
  ];

  const getRandomNumReplies = () => {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num * 0.5 + 1; // mean=1, stddev=2
    return Math.max(0, Math.round(num));
  };

  const commentReplyData = [];
  for (let i = 1; i <= commentData.length; i++) {
    for (let k = 0; k < getRandomNumReplies(); k++) {
      commentReplyData.push({
        blogId: commentData[i - 1].blogId,
        parentCommentId: i,
        userId: Math.floor(Math.random() * (users.length - 1)) + 1,
        content:
          randomReplies[Math.floor(Math.random() * randomReplies.length)],
        numUpvotes: getRandomRating(),
        numDownvotes: getRandomRating(),
      });
    }
  }

  await prisma.comments.createMany({
    data: commentReplyData,
  });

  const getRandomCommentId = () =>
    Math.floor(
      Math.random() * (commentData.length + commentReplyData.length - 2)
    ) + 1;

  const randomExplanations = [
    "The content violates community guidelines.",
    "The post contains offensive language.",
    "The blog promotes hate speech.",
    "The content is misleading or false.",
    "The post includes inappropriate images.",
    "The blog contains spam or scam content.",
    "The content is too political.",
    "The post is not friendly to LGBTQ+2 community.",
    "The blog promotes physical violence.",
    "The content is considered harassment.",
  ];

  const sampleUsers = (numUsers) => {
    const uniqueUsers = new Set();
    while (uniqueUsers.size < numUsers) {
      uniqueUsers.add(Math.floor(Math.random() * (users.length - 1)) + 1);
    }
    return [...uniqueUsers];
  };

  const getRandomNumReports = () => {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num * 3 + 15; // mean=15, stddev=10
    return Math.round(Math.abs(num));
  };

  const blogReports = [];
  for (let i = 1; i <= 30; i++) {
    const blogId = getRandomBlogId();
    const numReports = getRandomNumReports();
    const userSample = sampleUsers(
      Math.max(0, Math.min(numReports, users.length - 1))
    );

    const blog = await prisma.blogs.findUnique({
      where: { id: blogId },
    });
    await prisma.blogs.update({
      where: { id: blogId },
      data: { numReports: blog.numReports + userSample.length },
    });
    for (let j = 1; j <= userSample.length; j++) {
      blogReports.push({
        blogId: blogId,
        userId: userSample[j - 1],
        reportId: Math.floor(Math.random() * 8) + 1,
        explanation:
          randomExplanations[
            Math.floor(Math.random() * randomExplanations.length)
          ],
      });
    }
  }

  await prisma.blogReports.createMany({
    data: blogReports,
  });

  const commentReports = [];
  for (let i = 1; i <= 30; i++) {
    const commentId = getRandomCommentId();
    const numReports = getRandomNumReports();
    const userSample = sampleUsers(
      Math.max(0, Math.min(numReports, users.length - 1))
    );

    const comment = await prisma.comments.findUnique({
      where: { id: commentId },
    });

    await prisma.comments.update({
      where: { id: commentId },
      data: { numReports: comment.numReports + userSample.length },
    });
    for (let j = 1; j <= userSample.length; j++) {
      commentReports.push({
        commentId: commentId,
        userId: userSample[j - 1],
        reportId: Math.floor(Math.random() * 8) + 1,
        explanation:
          randomExplanations[
            Math.floor(Math.random() * randomExplanations.length)
          ],
      });
    }
  }

  await prisma.commentReports.createMany({
    data: commentReports,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
