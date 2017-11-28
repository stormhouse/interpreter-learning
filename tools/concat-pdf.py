# Loading the pyPdf Library
from PyPDF2 import PdfFileMerger, PdfFileReader, PdfFileWriter

# ...

merger = PdfFileMerger()


merger.write("document-output.pdf")
# from pyPdf import PdfFileReader, PdfFileWriter

# Creating a routine that appends files to the output file
# def append_pdf(input,output):
#     [output.addPage(input.getPage(page_num)) for page_num in range(input.numPages)]

# Creating an object where pdf pages are appended to
output = PdfFileWriter()

index = range(1, 6)
for _ in index:
    filename = '''Grammar Friends Teacher's book %s.pdf''' % _
    print(filename)
    # merger.append(PdfFileReader(open(filename, 'rb')))
# Appending two pdf-pages from two different files
# append_pdf(PdfFileReader(open("SamplePage1.pdf","rb")),output)
# append_pdf(PdfFileReader(open("SamplePage2.pdf","rb")),output)
#
# # Writing all the collected pages to a file
merger.write(open("CombinedPages.pdf","wb"))