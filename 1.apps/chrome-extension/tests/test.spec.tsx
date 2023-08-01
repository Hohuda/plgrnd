import type { ReactNode } from "react";
import { create } from "react-test-renderer";

interface LinkProps {
  page: string;
  children: ReactNode;
}

function NotLink({ page, children }: LinkProps): JSX.Element {
  return <a href={page}> {children} </a>;
}

const page = "https://www.facebook.com/";

const testRenderer = create(<NotLink page={page}>Facebook</NotLink>);
const testInstance = testRenderer.root;

test("React Renderer Documentation Test", () => {
  expect(testInstance.findByType(NotLink).props.page).toBe(page);
  expect(testInstance.findByProps({ href: page }).children).toContain(
    "Facebook"
  );
});
