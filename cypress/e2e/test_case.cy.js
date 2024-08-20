describe('Test Case Web Task Management', () => {
  beforeEach(() => {
    cy.visit('https://task-management-js-irsan.vercel.app/');
    cy.clearLocalStorage();
  });

  it('Test Case Penggunaan Web Task Management', () => {
    // Halaman Sign In
    // 1. Tidak Dapat Login Tanpa Mengetikkan Username (Negative Case)
    cy.get('button').contains('Sign In').click();
    cy.get('input[name="username"]').then(($input) => {
      cy.wrap($input[0].validationMessage).should(
        'equal',
        'Please fill out this field.',
      );
    });
    cy.get("input[name='username']").type('pengguna01');
    cy.get('button').contains('Sign In').click();
    cy.get('input[name="password"]').then(($input) => {
      cy.wrap($input[0].validationMessage).should(
        'equal',
        'Please fill out this field.',
      );
    });

    // 2. Tidak Dapat Login Dengan Akun Yang Belum Terdaftar (Negative Case)
    cy.get("input[name='password']").type('12345678');
    cy.get('button').contains('Sign In').click();
    cy.url().should(
      'eq',
      'https://task-management-js-irsan.vercel.app/signin.html',
    );

    // Halaman Add New User / Sign Up
    cy.get('a').contains('Create New Account').click();
    cy.url().should(
      'eq',
      'https://task-management-js-irsan.vercel.app/add-user.html',
    );

    // 3. Tidak Dapat Membuat Akun Tanpa Mengisi Username (Negative Case)
    cy.get('button').contains('Sign Up').click();
    cy.get('input[name="username"]').then(($input) => {
      cy.wrap($input[0].validationMessage).should(
        'equal',
        'Please fill out this field.',
      );
    });

    // 4. Tidak Dapat Membuat Akun Tanpa Mengisi Password (Negative Case)
    cy.get("input[name='username']").type('pengguna01');
    cy.get('button').contains('Sign Up').click();
    cy.get('input[name="password"]').then(($input) => {
      cy.wrap($input[0].validationMessage).should(
        'equal',
        'Please fill out this field.',
      );
    });

    // 5. Tidak Dapat Membuat Akun Dengan Password Yang Jumlah karakternya Kurang dari 8 (Negative Case)
    cy.get("input[name='password']").type('123');
    cy.get('button').contains('Sign Up').click();
    cy.url().should(
      'eq',
      'https://task-management-js-irsan.vercel.app/add-user.html',
    );

    // 6. Membuat Akun Untuk Login / Sign In (Positive Case)
    cy.get("input[name='password']").clear();
    cy.get("input[name='password']").type('12345678');
    cy.get('button').contains('Sign Up').click();
    cy.url().should(
      'eq',
      'https://task-management-js-irsan.vercel.app/signin.html',
    );

    // 7. Melakukan Login Dengan Password Yang Salah
    cy.get("input[name='username']").type('pengguna01');
    cy.get("input[name='password']").type('87654321');
    cy.get('button').contains('Sign In').click();
    cy.url().should(
      'eq',
      'https://task-management-js-irsan.vercel.app/signin.html',
    );

    // 8. Melakukan Login (Positive Case)
    cy.get("input[name='password']").clear();
    cy.get("input[name='password']").type('12345678');
    cy.get('button').contains('Sign In').click();
    cy.url().should(
      'eq',
      'https://task-management-js-irsan.vercel.app/tasks.html',
    );

    // Halaman Add New Task
    cy.get('a').contains('Add New Task').click();
    cy.url().should(
      'eq',
      'https://task-management-js-irsan.vercel.app/add-task.html',
    );

    // 9. Membuat Data Tugas Tanpa Mengisi Task Name (Negative)
    cy.get('button').contains('Save New Task').click();
    cy.get('input[name="taskname"]').then(($input) => {
      cy.wrap($input[0].validationMessage).should(
        'equal',
        'Please fill out this field.',
      );
    });

    // 10. Membuat Data Tugas Tanpa Mengisi Priority Level (Negative)
    cy.get('input[name="taskname"]').type('Pengujian Software');
    cy.get('button').contains('Save New Task').click();
    cy.get('select[name="priority"]').then(($input) => {
      cy.wrap($input[0].validationMessage).should(
        'equal',
        'Please select an item in the list.',
      );
    });

    // 11. Membuat Data Tugas (Negative)
    cy.get('select[name="priority"]').select('High');
    cy.get('button').contains('Save New Task').click();
    cy.window().then((win) => {
      cy.stub(win, 'alert').callsFake((msg) => {
        expect(msg).to.equal('Berhasil Tersimpan!');
      });
    });
    cy.url().should(
      'eq',
      'https://task-management-js-irsan.vercel.app/tasks.html',
    );

    // 12. Menandai Sebagai Complete (Positive Case)
    cy.get('p').contains('Pengujian Software').should('be.visible');
    cy.get('p').contains('In Progress').should('be.visible');
    cy.get('a').contains('Complete').click();
    cy.get('p').contains('Completed').should('be.visible');
    cy.get('a').contains('Complete').should('not.exist');

    // 13. Menghapus Data Tugas (Positive Case)
    cy.get('p').contains('Pengujian Software').should('be.visible');
    cy.get('p').contains('Completed').should('be.visible');
    cy.get('a').contains('Delete').click();
    cy.get('p').contains('Oops! No Task').should('be.visible');

    // 14. Melakukan Logout (Positive Case)
    cy.get('a').contains('Logout').click();
    cy.url().should(
      'eq',
      'https://task-management-js-irsan.vercel.app/signin.html',
    );
  });
});
