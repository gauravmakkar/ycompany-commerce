export const fetchAutocompleteData = async ({ q }: any) => {
	try {
		let data = []

		const categories = await (await fetch('http://localhost:3000/api/categories.json')).json()
    for (let i=0 ; i < categories.data.length ; i++)
    {
      if (categories.data[i]['key'].toLowerCase().includes(q?.toLowerCase())) {
        data.push(categories.data[i]);
      }
    }

    return data || []
	} catch (e) {
	}
}
