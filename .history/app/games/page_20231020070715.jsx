
import Link from 'next/link';

const Games = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Business Games</h1>
      </div>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
        <ul className="space-y-4">
          <li>
            <Link href="/entrepreneur-quiz">
              <a className="text-blue-500 hover:underline">Entrepreneur Type Quiz</a>
            </Link>
          </li>
          <li>
            <Link href="/financial-literacy-quiz">
              <a className="text-blue-500 hover:underline">Financial Literacy Quiz</a>
            </Link>
          </li>
          {/* Add more games here */}
        </ul>
      </div>
    </div>
  );
};

export default Games;
