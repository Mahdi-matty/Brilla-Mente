import { useState, useEffect } from 'react';
export default function HomePage() {

    const [repos, setRepos] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const  data = await API.getRepository();
          console.log(data)
          setRepos(data || []); // Ensure data is not undefined
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="container pt-4">
        <ul className="list-group list-group">
          {repos.map((repo) => (
            <ListItem key={repo.id}>
              <Profile repo={repo} />
            </ListItem>
          ))}
        </ul>
        <Footer/>
      </div>
    );
  }