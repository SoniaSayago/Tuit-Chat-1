import { TextArea } from './styles';

export default function MessageBox({ onMessage }) {
  const [content, setContent] = useState('');

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    onMessage(content);
  };

  return (
    <FormTextArea onSubmit={onSubmit}>
      <textarea
        rows="3"
        placeholder="Jot something down"
        value={content}
        onChange={onChangeContent}
      />
      <input type="submit" value="Send Message" />
    </FormTextArea>
  );
}
