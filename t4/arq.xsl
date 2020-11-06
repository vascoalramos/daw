<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:variable name="sortedItems">
        <xsl:for-each select="//ARQELEM">
            <xsl:sort select="IDENTI"/>
            <xsl:copy-of select="." />
        </xsl:for-each>
    </xsl:variable>
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <meta name="description" content="Um site com informação sobre locais de interesse rqueológico"/>
                    <meta name="author" content="Vasco Ramos"/>
                    <title>Arqueossitio - Base de Dados de Locais de Interesse Arqueológico</title>
                    
                    <!-- Bootstrap core CSS -->
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
                        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"/>
                    
                    <!-- Custom CSS -->
                    <link rel="stylesheet" href="/static/css/mine.css"/>
                </head>
                <body>
                    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                        <a class="navbar-brand" href="#"><i class="fas fa-atlas"></i> Arqueossitio</a>
                    </nav>
                    
                    <main role="main">
                        <div class="container">
                            <h2>Arqueossitio - Base de Dados de Locais de Interesse Arqueológico</h2>
                            <h3>Índice de Títulos</h3>
                            <ul>
                                <xsl:apply-templates select="//ARQELEM" mode="indice">
                                    <xsl:sort select="IDENTI" lang="pt"></xsl:sort>
                                </xsl:apply-templates>
                            </ul>
                        </div>
                    </main>
                    
                    <footer class="container">
                        <hr/>
                        <p class="float-right"><a href="#">Back to top</a></p>
                        <p><xsl:text disable-output-escaping="yes">&amp;</xsl:text>copy; DAW 2020 - Developed by Vasco Ramos.</p>
                    </footer>
                </body>
                
                <!-- jQuery core JS -->
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                    crossorigin="anonymous"/>
                
                <!-- Bootstrap core JS -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
                    crossorigin="anonymous"/>
                
                <!-- Font Awesome core JS -->
                <script src="https://kit.fontawesome.com/1209018324.js" crossorigin="anonymous"/>
            </html>
        </xsl:result-document>  
        
        <!-- Para criar as outras páginas -->
        <xsl:apply-templates/>
    </xsl:template>
    
    
    <!-- Templates de Índice ............................................... -->
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a href="/arqs/arq{count(preceding-sibling::*)+1}">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    
    <!-- Templates para o conteúdo ......................................... -->
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/arq{count(preceding-sibling::*)+1}.html">
            <html>
                <head>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <meta name="description" content="Um site com informação sobre povoações arqueológicas"/>
                    <meta name="author" content="Vasco Ramos"/>
                    <title><xsl:value-of select="IDENTI"/></title>
                    
                    <!-- Bootstrap core CSS -->
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
                        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"/>
                    
                    <!-- Custom CSS -->
                    <link rel="stylesheet" href="/static/css/mine.css"/>
                </head>
                <body>
                    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                        <a class="navbar-brand" href="#"><i class="fas fa-atlas"></i> Arqueossitio</a>
                    </nav>
                    
                    <main role="main">
                        <div class="container">
                            <div class="mt-4" style="text-align: center">
                                <h1><xsl:value-of select="IDENTI"/></h1>
                                
                                <p><b>Autor: </b> <xsl:value-of select="AUTOR"/></p>
                                <p><b>Data: </b> <xsl:value-of select="DATA"/></p>
                            </div>
                            
                            <div class="card bg-light mb-3">
                                <div class="card-body">
                                    <div class="row" style="text-align:center">
                                        <div class="col-4"><p class="mb-0"><b>Lugar: </b> <xsl:value-of select="LUGAR"/></p></div>
                                        <div class="col-4"><p class="mb-0"><b>Freguesia: </b> <xsl:value-of select="FREGUE"/></p></div>
                                        <div class="col-4"><p class="mb-0"><b>Concelho: </b> <xsl:value-of select="CONCEL"/></p></div>
                                    </div>
                                </div>
                            </div>
                            
                            <xsl:apply-templates select="ACESSO"/>
                            <xsl:apply-templates select="QUADRO"/>
                            <xsl:apply-templates select="DESARQ"/>
                            <xsl:apply-templates select="TRAARQ"/>
                            <xsl:apply-templates select="DEPOSI"/>
                            <xsl:apply-templates select="INTERE"/>
                            
                            <div id="bib" class="mt-4">
                                <h4>Bibliografia</h4>
                                <ul>
                                    <xsl:apply-templates select=".//BIBLIO"/>
                                </ul>
                            </div>
                            
                            <nav class="d-flex justify-content-center" aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item">

                                        <a class="page-link" href="/arqs/arq{count(preceding-sibling::*)}"><i class="fas fa-arrow-left"></i> Anterior</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="/">Voltar ao Índice</a>
                                    </li>
                                    <li class="page-item">
                                        <!-- FIX: Has no reguard to sorting -->
                                        <a class="page-link" href="/arqs/arq{count(preceding-sibling::*) + 2}"><i class="fas fa-arrow-right"></i> Próximo</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </main>
                    
                    <footer class="container">
                        <hr/>
                        <p class="float-right"><a href="#">Back to top</a></p>
                        <p><xsl:text disable-output-escaping="yes">&amp;</xsl:text>copy; DAW 2020 - Developed by Vasco Ramos.</p>
                    </footer>
                </body>
                
                <!-- jQuery core JS -->
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                    crossorigin="anonymous"/>
                
                <!-- Bootstrap core JS -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
                    crossorigin="anonymous"/>
                
                <!-- Font Awesome core JS -->
                <script src="https://kit.fontawesome.com/1209018324.js" crossorigin="anonymous"/>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="BIBLIO">
        <li>
            <xsl:value-of select="."/>
        </li>
    </xsl:template>
    
    <xsl:template match="ACESSO">
        <div id="acesso" class="mt-4 text-justify">
            <h4>Modo de Acesso</h4>
            <p>
                <xsl:apply-templates/>
            </p>
        </div>
    </xsl:template>
    
    <xsl:template match="QUADRO">
        <div id="enquadramento" class="mt-4 text-justify">
            <h4>Enquadramento Geográfico</h4>
            <p>
                <xsl:apply-templates/>
            </p>
        </div>
    </xsl:template>
    
    <xsl:template match="DESARQ">
        <div id="desc-arq" class="mt-4 text-justify">
            <h4>Descoberta arqueológico</h4>
            <p>
                <xsl:apply-templates/>
            </p>
        </div>
    </xsl:template>
    
    <xsl:template match="TRAARQ">
        <div id="trab-arq" class="mt-4 text-justify">
            <h4>Trabalho arqueológico</h4>
            <p>
                <xsl:apply-templates/>
            </p>
        </div>
    </xsl:template>
    
    <xsl:template match="DEPOSI">
        <div id="deposit-arq" class="mt-4 text-justify">
            <h4>Depósito arqueológico</h4>
            <p>
                <xsl:apply-templates/>
            </p>
        </div>
    </xsl:template>
    
    <xsl:template match="INTERE">
        <div id="deposit-arq" class="mt-4 text-justify">
            <h4>Curiosidades</h4>
            <p>
                <xsl:apply-templates/>
            </p>
        </div>
    </xsl:template>
    
    <xsl:template match="LIGA">
        <b><xsl:value-of select="."/></b>
    </xsl:template>
    
</xsl:stylesheet>