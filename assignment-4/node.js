const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const numStudents = await askQuestion("Enter the number of students: ");
  const students = [];

  for (let i = 0; i < numStudents; i++) {
    const registerNo = await askQuestion("Enter register no: ");
    const name = await askQuestion("Enter name: ");
    const sgpaLastSemester = await askQuestion("Enter SGPA last semester: ");
    const cgpaTillNow = await askQuestion("Enter CGPA till now: ");

    const student = {
      registerNo,
      name,
      sgpaLastSemester,
      cgpaTillNow,
    };
    students.push(student);
  }

  const dirPath = path.join(__dirname, "students");
  if (!(await exists(dirPath))) {
    await fs.mkdir(dirPath);
  }

  for (const student of students) {
    const fileName = `${student.registerNo}-${student.name}.txt`;
    const filePath = path.join(dirPath, fileName);
    const fileContent = `Hi ${student.name} ${student.registerNo}, Your SGPA is ${student.sgpaLastSemester} and CGPA is ${student.cgpaTillNow}.`;

    await fs.writeFile(filePath, fileContent);
  }

  console.log(`Files saved in ${dirPath}`);
  rl.close();
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function exists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

main();
