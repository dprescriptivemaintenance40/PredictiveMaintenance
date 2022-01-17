namespace Plant.Models
{
    public class Combination
    {
        static List<List<int>> combinationUtil(List<int> arr, int n,
                                       int r, int index,
                                       List<int> data, int i, List<List<int>> combination)
        {
            if (index == r)
            {
                List<int> temp = new List<int>();
                foreach (var item in data)
                {
                    temp.Add(item);
                }
                combination.Add(temp);
                return combination;
            }

            if (i >= n)
                return combination;

            data[index] = arr[i];
            combinationUtil(arr, n, r,
                            index + 1, data, i + 1, combination);

            combinationUtil(arr, n, r, index,
                            data, i + 1, combination);
            return combination;
        }


        public List<List<int>> printCombination(List<int> arr,
                                    int n, int r)
        {
            List<int> data = new List<int>();
            for (int i = 0; i < r; i++)
            {
                data.Add(0);
            }
            List<List<int>> combination = new List<List<int>>();
            return combinationUtil(arr, n, r, 0, data, 0, combination);
        }
    }
}
