import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // const posts = await
        // const users = await Posts.find({});
        // res.status(200).json({ success: true, data: users });
      } catch (error) {
        // res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        // const posts = await
        // const user = await Post.create(req.body);
        // res.status(201).json({ success: true, data: user });
      } catch (error) {
        // res.status(400).json({ success: false });
      }
      break;
    default:
      // res.status(400).json({ success: false });
      break;
  }
}
