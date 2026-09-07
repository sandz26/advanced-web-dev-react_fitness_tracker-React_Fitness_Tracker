import { useNavigate } from 'react-router'
import Header from '../components/common/Header'
import Button from '../components/UI/Button'

function NotFound() {
  const navigate = useNavigate()

  return (
    <section className="page">
      <Header
        title="404 - Page Not Found"
        subtitle="The page you're looking for doesn't exist."
      />
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </section>
  )
}

export default NotFound
