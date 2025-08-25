import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">About</CardTitle>
        <CardContent className="px-0 text-sm text-slate-600">
          I am a Fullstack Developer with experience in building web
          applications from both the frontend and backend. On the frontend, I
          work with React.js and Next.js to create modern, responsive, and
          user-friendly interfaces. I&apos;m used to integrating UI designs with
          reusable components while ensuring optimal performance and
          accessibility across various devices. On the backend, I commonly use
          Next.js API Routes or Express.js to build secure and efficient RESTful
          APIs. I also have experience managing and connecting applications to
          various types of databases such as MongoDB, PostgreSQL, and MySQL,
          either directly or using ORMs like Prisma or Mongoose. In addition, I
          have worked with Laravel on several small projects. While I&apos;m not
          yet highly proficient, I am continuously learning and deepening my
          understanding of this framework, including concepts like MVC
          architecture, routing, and Eloquent ORM. In my development workflow, I
          regularly use Git and GitHub for version control, and Vercel for
          deploying Next.js-based applications. I also use Postman for API
          testing and Redux for state management in medium to large-scale
          applications. I always strive to write clean, well-structured, and
          maintainable code, while following best practices in software
          development. I enjoy learning new things and am open to constructive
          feedback to keep improving. Currently, I am open to freelance projects
          or remote work opportunities, especially in modern web application
          development using the technologies I specialize in.
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default AboutCard;
