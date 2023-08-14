from flask import Flask,render_template,make_response
import pdfkit

app = Flask(__name__,template_folder='template')

@app.route('/')
def pdf_template():
    rendered= render_template("pdf_template.html")
    css=['main.css']
    pdf=pdfkit.from_string(rendered,False,css=css)

    response=make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=output.pdf'

    return response
if __name__ == '__main__':
    app.run(debug=True)

