// ChatPage.js
import {useEffect, useState} from 'react'

import {Box, Button, Input, Text} from '@chakra-ui/react'

import {supabase} from '@/api'
import {OPENAI_API_KEY, OPENAI_API_URL} from '@/constants'

const ChatPage = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchItemNames = async () => {
      const {data} = await supabase.from('receipt_items').select()
      const names = data?.map((item) => item.name)
      setItems(names)
    }

    const fetchCategoryNames = async () => {
      const {data} = await supabase.from('categories').select()
      const categories = data?.map((category) => category.name)
      setCategories(categories)
    }

    fetchItemNames()
    fetchCategoryNames()
  }, [])

  const [productName, setProductName] = useState('')
  const [response, setResponse] = useState('')

  const handleProductNameChange = (e) => {
    setProductName(e.target.value)
  }

  const handleChatSubmit = async () => {
    for (const item of items) {
      try {
        const categoryPrompt = `Please choose the most appropriate category from the following list: ${categories.join(
          ', '
        )}.`
        const productPrompt = `Next, I will provide a product name. In your response, use one category name. For example, if the product names are "video game" your response should be "Entertainment". If a product doesn't fit any of the given categories, print "Other".`
        const productNamePrompt = `Here is the product name: "${item}"`
        const content = `${categoryPrompt} ${productPrompt} ${productNamePrompt}`

        const response = await fetch(OPENAI_API_URL + '/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content}],
            max_tokens: 2000,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch GPT response')
        }

        const data = await response.json()
        setResponse(data.choices[0].message.content)

        // Update category in the database
        const {error: updateError} = await supabase
          .from('receipt_items')
          .update({category: data.choices[0].message.content})
          .eq('name', item)

        if (updateError) {
          throw new Error(`Failed to update category for item with name ${item}`)
        }

        console.log(`Category updated for item: ${item} to: ${data.choices[0].message.content}`)
      } catch (error) {
        console.error('Error handling item:', error)
        setResponse('Error processing item. Please try again.')
      }
    }
  }

  return (
    <Box p={4}>
      <Text fontSize="xl" mb={4}>
        Enter the product name:
      </Text>
      <Input
        placeholder="Type your product name here..."
        value={productName}
        onChange={handleProductNameChange}
        mb={4}
      />
      <Button colorScheme="blue" onClick={handleChatSubmit}>
        Submit
      </Button>
      {response && (
        <Box mt={4}>
          <Text fontWeight="bold">Prompt:</Text>
          <Text fontWeight="bold">Product names:</Text>
          <Text>{items.join('; ')}</Text>
          <Text fontWeight="bold">GPT Response:</Text>
          <Text>{response}</Text>
        </Box>
      )}
    </Box>
  )
}

export default ChatPage
